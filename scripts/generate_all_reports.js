const { execSync } = require('child_process');
const path = require('path');

const buildingMap = {
  gongxueguan: '工学馆',
  jichulou: '基础楼',
  shiyanlou: '综合实验楼',
  dizhilou: '地质楼',
  guanlilou: '管理楼',
  dahuiguan: '大学会馆',
  jiusy: '旧实验楼',
  renwenlou: '人文楼',
  keji: '科技楼',
};

for (const code of Object.keys(buildingMap)) {
  console.log(`\n生成 ${buildingMap[code]} 的报告...`);
  execSync(`node ${path.join(__dirname, 'generate_report.js')}`, {
    stdio: 'inherit',
    env: { ...process.env, BUILDING_CODE: code },
  });
}
