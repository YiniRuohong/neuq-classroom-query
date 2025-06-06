## 东北大学秦皇岛分校工学馆空闲教室表

### 查看空闲教室

建议在本地启动一个静态HTTP服务（如 `npx serve` 或 `python -m http.server`）
后访问 `index.html`，这样浏览器才可以正确读取 `output` 目录中的 JSON 文
件并展示表格。

若要部署到 GitHub Actions 中自动化执行，请在仓库设置中添加两个 Repository secrets：`GXG_USERNAME` 设为你的学号；`GXG_PASSWORD` 设为你的密码。

然后在 `.github/workflows` 目录新建 `scrape.yml`，内容如下：

```yaml
name: Update classroom data
on:
  workflow_dispatch:
  schedule:
    - cron: '0 22 * * *'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm test
        env:
          GXG_USERNAME: ${{ secrets.GXG_USERNAME }}
          GXG_PASSWORD: ${{ secrets.GXG_PASSWORD }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

该流程会在每天 22 点自动执行抓取任务，并将生成的 JSON 与页面发布到 GitHub Pages。
退回到旧式的 `classroom_results_<时间段>.json`。

本仓库通过部署在 GitHub Actions 上的 Playwright 测试自动获取空闲教室信息，
并将 JSON 与本页面一同发布到 GitHub Pages。若需在本地重新生成数据，可运
行 `npm test`，生成的 JSON 文件保存到 `output` 目录。



本地测试时，可在环境变量 `GXG_USERNAME` 和 `GXG_PASSWORD` 中提供登录凭据，
或直接在 tests/classroom-query.spec.ts 中替换占位字符串。要查询特定教学楼，可通过
环境变量 `GXG_BUILDING` 指定下拉框的值，支持用逗号分隔多个值（如 `1,2,3`）。如未指定则会遍历所有教学楼。


若要部署到GitHub Actions中自动化执行，请在仓库设置中添加两个Repository secrets：`GXG_USERNAME`设为你的学号；`GXG_PASSWORD`设为你的密码。

由于东秦教务系统网站可能时有变动，会导致Playwright自动化运行失效，请以教务系统实际查询结果为准。

本项目的诞生离不开Gemini和GitHub Copilot的协助。
