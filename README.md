## 东北大学秦皇岛分校工学馆空闲教室表

### 查看空闲教室

直接打开 `index.html` 即可查看空闲教室表。页面包含教学楼下拉框，选择后会
动态加载 `output` 目录下的 JSON 数据并展示表格。
页面首先尝试读取 `classroom_results_<楼号>_<时间段>.json`，若不存在则会
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
