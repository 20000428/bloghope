package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

const rawURL = "https://yesuifeng.cc/sap/abap/porestful.html"

// const rawURL = "https://yesuifeng.cc/sap/fico/accountdetermination.html"

var batch = time.Now().Format("060102150405") // 批次号

// ---------- 文件命名 ----------
func tmpDir() string {
	dir := "tmp"
	_ = os.MkdirAll(dir, 0755)
	return dir
}
func mainPDF() string    { return filepath.Join(tmpDir(), batch+"_main.pdf") }
func mergedPDF() string  { return filepath.Join(tmpDir(), batch+"_merged.pdf") }
func finalPDF() string   { return filepath.Join(tmpDir(), batch+"_output.pdf") }
func bookmarkFn() string { return filepath.Join(tmpDir(), batch+"_bookmark.txt") }

// ---------- 主入口 ----------
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	mainPdf := mainPDF()
	finalPdf := finalPDF()
	var markersJSON string

	// 1. 生成正文 PDF
	if err := chromedp.Run(ctx,
		chromedp.Navigate(rawURL),
		chromedp.WaitReady("body"),
		// 注入不可见的书签标记，并返回 level/text/token 列表
		chromedp.Evaluate(`(function(){
            const style=document.createElement('style');
            style.textContent='@media print{.bmk{color:#fff!important;font-size:1px!important}} .bmk{color:#fff;font-size:1px}';
            document.head.appendChild(style);
            const list=[]; let idx=0;
            for(const h of document.querySelectorAll('h1,h2,h3')){
                const level=parseInt(h.tagName.substring(1));
                const text=(h.innerText||'').trim();
                if(!text) continue;
                const token='BMK-'+(idx++);
                const span=document.createElement('span');
                span.className='bmk';
                span.textContent=' ['+token+']';
                h.appendChild(span);
                list.push({level,text,token});
            }
            return JSON.stringify(list);
        })()`, &markersJSON),
		waitImages(),
		chromedp.Sleep(2*time.Second),
		printToPDF(mainPdf),
	); err != nil {
		panic(err)
	}

	// 2. 书签（基于注入的标记 token 定位页码）
	bookmark, err := extractBookmarkFromMarkers(mainPdf, markersJSON)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile(bookmarkFn(), []byte(bookmark), 0644); err != nil {
		panic(err)
	}

	// 3. 合并
	mergedPdf := mergedPDF()
	if err := mergePDFs(mergedPdf, mainPdf); err != nil {
		panic(err)
	}

	// 4. 写入书签
	cmd := exec.Command("pdftk", mergedPdf, "update_info_utf8", bookmarkFn(), "output", finalPdf)
	if err := cmd.Run(); err != nil {
		panic(err)
	}
	fmt.Println("✅ 完整 PDF 已生成：", finalPdf)
}

// ---------- 下面依次定义所有函数 ----------

func waitImages() chromedp.ActionFunc {
	return chromedp.ActionFunc(func(ctx context.Context) error {
		// 1. 分批滚动
		for i := 0; i < 20; i++ {
			if err := chromedp.Evaluate(`window.scrollBy(0, innerHeight)`, nil).Do(ctx); err != nil {
				return err
			}
			if err := chromedp.Sleep(800 * time.Millisecond).Do(ctx); err != nil {
				return err
			}
		}
		// 2. 回顶部
		if err := chromedp.Evaluate(`window.scrollTo(0, 0)`, nil).Do(ctx); err != nil {
			return err
		}
		// 3. 等待 <img> 加载完成
		if err := chromedp.Evaluate(`Promise.all(Array.from(document.images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((res, rej) => {
                img.addEventListener('load', res);
                img.addEventListener('error', rej);
            });
        }))`, nil).Do(ctx); err != nil {
			return err
		}
		// 4. 等 Mermaid SVG 渲染
		if err := chromedp.Evaluate(`
			new Promise(resolve => {
				const t=setInterval(()=>{
					const mm=[...document.querySelectorAll('.mermaid')];
					if(mm.length>0 && mm.every(d=>d.querySelector('svg'))){ clearInterval(t); resolve();}
				},300);
			})
		`, nil).Do(ctx); err != nil {
			return err
		}
		// 5. 缓冲
		return chromedp.Sleep(3 * time.Second).Do(ctx)
	})
}

func printToPDF(outPath string) chromedp.ActionFunc {
	return chromedp.ActionFunc(func(ctx context.Context) error {
		pdf, _, err := page.PrintToPDF().
			WithPaperWidth(8.27).
			WithPaperHeight(11.69).
			WithMarginTop(0.8).
			WithMarginBottom(0.8).
			WithMarginLeft(0.5).
			WithMarginRight(0.5).
			WithDisplayHeaderFooter(true).
			WithHeaderTemplate("Header").
			WithFooterTemplate(`<div style="font-size:10px;text-align:center;width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`).
			Do(ctx)
		if err != nil {
			return err
		}
		return os.WriteFile(outPath, pdf, 0644)
	})
}

func extractBookmark(pdfPath string) (string, error) {
	out, err := exec.Command("pdftotext", "-layout", pdfPath, "-").Output()
	if err != nil {
		return "", err
	}
	text := string(out)
	// re := regexp.MustCompile(`chapter-(\w+)`)
	// 👇 改动 1：只抓 chapter-xxx 或 # 开头的编号标题
	re := regexp.MustCompile(`(?mi)(?:chapter-(\w+)|^#\s*(\d+\..+))$`)
	matches := re.FindAllStringSubmatch(text, -1)
	lines := []string{}
	page := 1
	for _, m := range matches {
		lines = append(lines,
			"BookmarkBegin",
			"BookmarkTitle: chapter-"+m[1],
			"BookmarkLevel: 1",
			"BookmarkPageNumber: "+strconv.Itoa(page),
		)
		page++
	}
	return strings.Join(lines, "\n"), nil
}

func mergePDFs(merged, mainPdf string) error {
	args := []string{}
	front := filepath.Join(tmpDir(), batch+"_front.pdf")
	back := filepath.Join(tmpDir(), batch+"_back.pdf")
	if _, err := os.Stat(front); err == nil {
		args = append(args, front)
	}
	args = append(args, mainPdf)
	if _, err := os.Stat(back); err == nil {
		args = append(args, back)
	}
	cmd := exec.Command("pdftk", append(args, "cat", "output", merged)...)
	return cmd.Run()
}

// 基于 DOM 抓取到的 h1/h2/h3 标题生成书签
func extractBookmarkFromHeadings(pdfPath string, headingsJSON string) (string, error) {
	// 解析来自页面的标题数组
	type heading struct {
		Level int    `json:"level"`
		Text  string `json:"text"`
	}
	var headings []heading
	if err := json.Unmarshal([]byte(headingsJSON), &headings); err != nil {
		return "", err
	}

	// 将生成的 PDF 转成文本并按换页符分页
	out, err := exec.Command("pdftotext", "-layout", pdfPath, "-").Output()
	if err != nil {
		return "", err
	}
	pages := strings.Split(string(out), "\f")

	lines := []string{}
	for _, h := range headings {
		t := strings.TrimSpace(h.Text)
		if t == "" {
			continue
		}
		// 在文本页中查找首次出现的页码
		pageNum := 1
		found := false
		for i, p := range pages {
			if strings.Contains(p, t) {
				pageNum = i + 1
				found = true
				break
			}
		}
		if !found {
			pageNum = 1
		}
		level := h.Level
		if level < 1 {
			level = 1
		}
		if level > 6 {
			level = 6
		}
		lines = append(lines,
			"BookmarkBegin",
			"BookmarkTitle: "+t,
			"BookmarkLevel: "+strconv.Itoa(level),
			"BookmarkPageNumber: "+strconv.Itoa(pageNum),
		)
	}

	return strings.Join(lines, "\n"), nil
}

// 基于打印前注入的 token 精确定位标题所在页，生成书签
func extractBookmarkFromMarkers(pdfPath string, markersJSON string) (string, error) {
	type marker struct {
		Level int    `json:"level"`
		Text  string `json:"text"`
		Token string `json:"token"`
	}
	var markers []marker
	if err := json.Unmarshal([]byte(markersJSON), &markers); err != nil {
		return "", err
	}
	out, err := exec.Command("pdftotext", "-layout", pdfPath, "-").Output()
	if err != nil {
		return "", err
	}
	pages := strings.Split(string(out), "\f")

	lines := []string{}
	for _, m := range markers {
		t := strings.TrimSpace(m.Text)
		if t == "" || m.Token == "" {
			continue
		}
		pageNum := 1
		for i, p := range pages {
			if strings.Contains(p, m.Token) {
				pageNum = i + 1
				break
			}
		}
		level := m.Level
		if level < 1 {
			level = 1
		}
		if level > 6 {
			level = 6
		}
		lines = append(lines,
			"BookmarkBegin",
			"BookmarkTitle: "+t,
			"BookmarkLevel: "+strconv.Itoa(level),
			"BookmarkPageNumber: "+strconv.Itoa(pageNum),
		)
	}
	return strings.Join(lines, "\n"), nil
}
