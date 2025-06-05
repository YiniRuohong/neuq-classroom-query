## 东北大学秦皇岛分校工学馆空闲教室表

### 切换教学楼

运行 `node scripts/generate_report.js <楼代号>` 生成对应教学楼的 HTML 文件。
可使用的楼代号与页面中的下拉列表保持一致，如 `gongxueguan`、`jichulou` 等。
默认生成 `gongxueguan.html`，页面内包含下拉框，可在不同教学楼页面之间切换。

本仓库通过部署在GitHub Actions上的Playwright测试来自动化获取空闲教室信息，并且生成对应HTML文件，自动发布在GitHub Pages上。

可以通过更改scripts/generate_report.js来变换HTML样式。

由于generate_report.js需要用到`jsdom`，在本地测试时确保安装了该包。

本地测试时，将tests/classroom-query.spec.ts中的YOUR_ACTUAL_USERNAME替换为你的教务系统学号；YOUR_ACTUAL_PASSWORD替换为你的教务系统登录密码。

若要部署到GitHub Actions中自动化执行，请在仓库设置中添加两个Repository secrets：`GXG_USERNAME`设为你的学号；`GXG_PASSWORD`设为你的密码。

由于东秦教务系统网站可能时有变动，会导致Playwright自动化运行失效，请以教务系统实际查询结果为准。

本项目的诞生离不开Gemini和GitHub Copilot的协助。
