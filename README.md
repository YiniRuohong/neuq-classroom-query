## 东北大学秦皇岛分校工学馆空闲教室表

### 切换教学楼

运行 `node scripts/generate_report.js <楼代号>` 生成对应教学楼的 HTML 文件。
可使用的楼代号与页面中的下拉列表保持一致，如 `gongxueguan`、`jichulou` 等。
默认生成 `gongxueguan.html`，页面内包含下拉框，可在不同教学楼页面之间切换。

运行 Playwright 测试需要安装浏览器。如果无法通过 `npx playwright install`
 下载官方浏览器，可在系统中安装 `chromium-browser` 并在运行测试前设
 置环境变量 `CHROMIUM_PATH` 指向其可执行文件路径。例如：

```bash
sudo apt-get update && sudo apt-get install -y chromium-browser
CHROMIUM_PATH=/usr/bin/chromium-browser GXG_USERNAME=你的学号 \
GXG_PASSWORD=你的密码 npm test
```

运行任意楼代号生成页面后，脚本会同时更新 `index.html` 作为导航页，
其中的下拉列表可以在各教学楼页面之间切换并自动刷新。

本仓库通过部署在GitHub Actions上的Playwright测试来自动化获取空闲教室信息，并且生成对应HTML文件，自动发布在GitHub Pages上。

可以通过更改scripts/generate_report.js来变换HTML样式。

由于generate_report.js需要用到`jsdom`，在本地测试时确保安装了该包。

本地测试时，可在环境变量 `GXG_USERNAME` 和 `GXG_PASSWORD` 中提供登录凭据，
或直接在 tests/classroom-query.spec.ts 中替换占位字符串。

若要部署到GitHub Actions中自动化执行，请在仓库设置中添加两个Repository secrets：`GXG_USERNAME`设为你的学号；`GXG_PASSWORD`设为你的密码。

由于东秦教务系统网站可能时有变动，会导致Playwright自动化运行失效，请以教务系统实际查询结果为准。

本项目的诞生离不开Gemini和GitHub Copilot的协助。
