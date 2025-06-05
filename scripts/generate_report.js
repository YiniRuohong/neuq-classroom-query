const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// 处理命令行参数或环境变量来确定要生成的教学楼名称和代码
const buildingArg = process.env.BUILDING_CODE || process.argv[2] || "gongxueguan";
const buildingMap = {
  gongxueguan: "工学馆",
  jichulou: "基础楼",
  shiyanlou: "综合实验楼",
  dizhilou: "地质楼",
  guanlilou: "管理楼",
  dahuiguan: "大学会馆",
  jiusy: "旧实验楼",
  renwenlou: "人文楼",
  keji: "科技楼",
};
const buildingName = buildingMap[buildingArg] || "工学馆";
const buildingNumberMap = {
  gongxueguan: '1',
  jichulou: '2',
  shiyanlou: '3',
  dizhilou: '4',
  guanlilou: '5',
  dahuiguan: '6',
  jiusy: '7',
  renwenlou: '8',
  keji: '9',
};
const buildingNumber = buildingNumberMap[buildingArg] || '1';

// HTML 样板字符串
const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>东秦${buildingName}空闲教室表</title>
    <style>
        body {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 30px;
            font-family: monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #333;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
        }

        ul {
            list-style: none;
            align-items: center;
            text-align: center;
            padding: 0;
        }

        li {
            margin: 15px 0;
            font-size: 16px;
        }

        a {
            text-decoration: none;
            color: #2c3e50;
            font-weight: 500;
        }

        a:hover {
            text-decoration: underline;
        }

        u {
        }
        strong {
            color: #4b0082;
        }
    </style>
</head>

<body>
    <div style="text-align:center;margin-bottom:20px;">
      <label for="buildingSelect">切换教学楼：</label>
      <select id="buildingSelect">
        ${Object.entries(buildingMap).map(([code, name]) => {
          const selected = code === buildingArg ? "selected" : "";
          return `<option value="${code}" ${selected}>${name}</option>`;
        }).join('')}
      </select>
    </div>
    <h1>current-date🏫东秦${buildingName}空闲教室表</h1>
    <p align=left>本空闲教室表更新于YYYY/MM/DD HH:MM</p>
    <p align=center><u>下划线</u>表示该教室在上一时间段未处于空闲状态</p>
    <p align=center><strong>靛色粗体</strong>表示该教室全天(第1-12节)处于空闲</p>
    <p align=center>内容仅供参考，实际请以<a href="https://jwxt.neuq.edu.cn/">教务系统</a>查询结果为准</p>
    <p align=right>Powered by Tsiaohan Wang <a href="https://github.com/TsiaohanWang/neuq-classroom-query">项目入口</a></p>
    <hr>
    <ul>
        <li style="font-weight: bold; font-size: 18px;">🏙上午第1-2节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🏙上午第3-4节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🌇下午第5-6节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🌇下午第7-8节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🌃晚上第9-10节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🌃晚上第11-12节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li style="font-weight: bold; font-size: 18px;">🏙昼间第1-8节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="font-size: 12px">楼层</th>
                        <th style="font-size: 12px">教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px;">7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
    </ul>
    <hr>
    <p align=center>Powered by Tsiaohan Wang</p>
    <script>
      document.getElementById('buildingSelect').addEventListener('change', function () {
        var code = this.value;
        if(code !== '${buildingArg}') {
          window.location.href = code + '.html';
        }
      });
    </script>
</body>

</html>
`;


// JSON文件所在的目录 (父目录下的output文件夹)
const jsonDir = path.join(__dirname, "..", "output");
// 生成的HTML文件名，根据教学楼代码命名
const outputHtmlFile = path.join(__dirname, "..", `${buildingArg}.html`);

// 时间段标签与JSON文件后缀的映射
// 新增 isIndividualSlot 标志，用于识别构成全天的小节数据
const timeSlotMappings = [
  { label: "🏙上午第1-2节", fileSuffix: "1-2", isFirstSlot: true, isIndividualSlot: true },
  { label: "🏙上午第3-4节", fileSuffix: "3-4", isIndividualSlot: true },
  { label: "🌇下午第5-6节", fileSuffix: "5-6", isIndividualSlot: true },
  { label: "🌇下午第7-8节", fileSuffix: "7-8", isIndividualSlot: true },
  { label: "🌃晚上第9-10节", fileSuffix: "9-10", isIndividualSlot: true },
  { label: "🌃晚上第11-12节", fileSuffix: "11-12", isIndividualSlot: true },
  { label: "🏙昼间第1-8节", fileSuffix: "1-8", noUnderline: true, isIndividualSlot: false }, // 昼间数据不用于计算全天空闲，也不参与下划线
];

// 辅助函数：获取当前北京时间并格式化
function getBeijingTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;
  return `${getPart("year")}/${getPart("month")}/${getPart("day")} ${getPart("hour")}:${getPart("minute")}`;
}
// 辅助函数：获取当前北京日期并格式化
function getBeijingDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;
  return `${getPart("year")}/${getPart("month")}/${getPart("day")}`;
}


// 辅助函数：从JSON数据中提取所有符合当前教学楼的教室号到一个Set中
function getAllClassroomsFromData(jsonData) {
    const classrooms = new Set(); // 使用Set来存储教室号，自动去重
    // 检查jsonData是否有效且为数组
    if (!jsonData || !Array.isArray(jsonData)) {
        return classrooms; // 返回空Set
    }
    // 遍历jsonData中的每个条目
    for (const entry of jsonData) {
        // 确保条目是关于当前教学楼，并且具有“名称”字段
        if (entry["教学楼"] === buildingName && entry["名称"]) {
            let classroomName = entry["名称"]; // 获取教室名称
            // 如果教室名称以楼名开头，则移除此前缀
            if (classroomName.startsWith(buildingName)) {
                classroomName = classroomName.substring(buildingName.length).trim();
            }
            // 确保处理后的教室名称是纯数字（例如 "101", "410"）
            if (/^\d+$/.test(classroomName)) {
                classrooms.add(classroomName); // 将符合条件的教室号添加到Set中
            }
        }
    }
    return classrooms; // 返回包含所有提取到的教室号的Set
}

// 新辅助函数：预先计算全天空闲的教室
function calculateAllDayFreeClassrooms() {
    const individualSlotMappings = timeSlotMappings.filter(m => m.isIndividualSlot); // 获取所有标记为独立小节的时间段
    if (individualSlotMappings.length === 0) {
        return new Set(); // 如果没有独立小节数据，则没有全天空闲教室
    }

    let commonClassrooms = null; // 用于存储共同空闲的教室，初始为null

    // 遍历所有独立小节的时间段
    for (const slotMapping of individualSlotMappings) {
        const jsonFilePath = path.join(jsonDir, `classroom_results_${buildingNumber}_${slotMapping.fileSuffix}.json`); // 构建JSON文件路径
        let currentSlotClassrooms = new Set(); // 当前小节的空闲教室

        // 检查JSON文件是否存在
        if (fs.existsSync(jsonFilePath)) {
            try {
                const rawData = fs.readFileSync(jsonFilePath, "utf-8"); // 读取文件内容
                const jsonData = JSON.parse(rawData); // 解析JSON数据
                currentSlotClassrooms = getAllClassroomsFromData(jsonData); // 从当前小节数据中提取教室
            } catch (error) {
                console.error(`计算全天空闲教室时，处理文件 ${jsonFilePath} 失败:`, error);
                // 如果任何一个文件处理失败，则无法确定全天空闲，返回空Set
                return new Set();
            }
        } else {
            console.warn(`计算全天空闲教室时，JSON文件未找到: ${jsonFilePath}。该时间段将视为空。`);
            // 如果某个小节文件缺失，则认为没有教室在该小节空闲，因此全天空闲教室也为空
            return new Set();
        }

        // 如果是第一个被处理的小节，则commonClassrooms直接设为当前小节的教室
        if (commonClassrooms === null) {
            commonClassrooms = currentSlotClassrooms;
        } else {
            // 否则，取commonClassrooms与当前小节教室的交集
            commonClassrooms = new Set([...commonClassrooms].filter(classroom => currentSlotClassrooms.has(classroom)));
        }
    }
    // 返回最终在所有独立小节中都出现的教室集合
    return commonClassrooms || new Set();
}


// 辅助函数：处理单个JSON文件数据，按楼层组织教室号，并根据条件标记教室（加粗、下划线）
function processJsonDataForSlot(jsonData, previousSlotClassrooms, currentSlotMapping, allDayFreeClassroomsSet) {
  // 初始化楼层数据结构，每个楼层对应一个空数组
  const floorsData = {
    "1F": [], "2F": [], "3F": [], "4F": [], "5F": [], "6F": [], "7F": [],
  };

  // 检查传入的jsonData是否有效
  if (!jsonData || !Array.isArray(jsonData)) {
    console.warn("提供的JSON数据无效或为空数组");
    // 如果数据无效，则将所有楼层的教室标记为错误信息
    for (const floorKey in floorsData) {
      floorsData[floorKey] = "数据解析错误";
    }
    return floorsData; // 返回包含错误信息的楼层数据
  }

  // 遍历jsonData中的每个教室条目
  for (const entry of jsonData) {
    // 确保条目是关于当前教学楼，并且具有“名称”字段
    if (entry["教学楼"] === buildingName && entry["名称"]) {
      let classroomName = entry["名称"]; // 获取原始教室名称
      // 如果教室名称以楼名开头，则移除此前缀并去除首尾空格
      if (classroomName.startsWith(buildingName)) {
        classroomName = classroomName.substring(buildingName.length).trim();
      }

      // 确保处理后的教室名称是纯数字（例如 "101", "410"）
      if (/^\d+$/.test(classroomName)) {
        const floorDigit = classroomName.charAt(0); // 获取教室号的第一个数字作为楼层标识
        const floorKey = `${floorDigit}F`; // 拼接成楼层键名，如 "1F", "2F"

        // 检查计算出的楼层键名是否存在于floorsData中
        if (floorsData.hasOwnProperty(floorKey)) {
          let displayClassroom = classroomName; // 初始化显示用的教室名（默认为原始教室名）
          let isUnderlined = false; // 标记是否需要下划线
          let isBold = false; // 标记是否需要加粗

          // 检查是否为全天空闲教室
          if (allDayFreeClassroomsSet.has(classroomName)) {
            isBold = true; // 如果是全天空闲，则标记为加粗
          }

          // 检查是否为“新出现”的空闲教室（需要加下划线）
          // 条件：1. 不是第一个时间段 2. 当前时间段没有被标记为noUnderline 3. 上一个时间段的空闲教室集合中不包含此教室
          if (!currentSlotMapping.isFirstSlot && !currentSlotMapping.noUnderline && !previousSlotClassrooms.has(classroomName)) {
            isUnderlined = true; // 如果满足条件，则标记为需要下划线
          }

          // 根据标记组合最终显示的HTML字符串
          if (isBold && isUnderlined) {
            displayClassroom = `<strong><u>${classroomName}</u></strong>`; // 同时加粗和下划线
          } else if (isBold) {
            displayClassroom = `<strong>${classroomName}</strong>`; // 仅加粗
          } else if (isUnderlined) {
            displayClassroom = `<u>${classroomName}</u>`; // 仅下划线
          }
          // 将包含原始教室号和处理后显示字符串的对象添加到对应楼层的数组中
          floorsData[floorKey].push({ raw: classroomName, display: displayClassroom });
        }
      }
    }
  }

  // 遍历每个楼层的数据
  for (const floorKey in floorsData) {
    // 如果当前楼层有教室数据
    if (floorsData[floorKey].length > 0 && typeof floorsData[floorKey][0] === 'object') { // 确保是对象数组，而不是错误字符串
      // 按原始教室号（raw）进行数字升序排序，然后提取显示用的字符串（display），最后用空格连接
      floorsData[floorKey] = floorsData[floorKey]
        .sort((a, b) => parseInt(a.raw) - parseInt(b.raw))
        .map(item => item.display)
        .join(" ");
    } else if (Array.isArray(floorsData[floorKey]) && floorsData[floorKey].length === 0) {
      // 如果楼层数组为空（没有符合条件的教室），则显示"无"
      floorsData[floorKey] = "无";
    }
    // 如果已经是错误字符串，则保持不变
  }
  return floorsData; // 返回处理后的楼层数据
}

// 主处理函数：生成HTML报告
function generateHtmlReport() {
  const dom = new JSDOM(htmlTemplate); // 使用JSDOM库解析HTML样板字符串，创建一个DOM对象
  const document = dom.window.document; // 获取DOM对象中的document对象，用于操作HTML

  // 步骤 1: 更新HTML中的时间戳和日期
  // 更新“本空闲教室表更新于...”的时间戳
  const paragraphs = document.querySelectorAll("p"); // 获取所有的<p>元素
  const timestampPlaceholder1 = "本空闲教室表更新于YYYY/MM/DD HH:MM"; // 定义时间戳占位符
  paragraphs.forEach((p) => { // 遍历每个<p>元素
    if (p.textContent.includes(timestampPlaceholder1)) { // 如果<p>元素的文本内容包含占位符
      p.textContent = `本空闲教室表更新于${getBeijingTime()}`; // 将占位符替换为当前的北京时间
    }
  });
  // 更新<h1>标题中的日期
  const h1s = document.querySelectorAll("h1"); // 获取所有的<h1>元素
  const timestampPlaceholder2 = `current-date🏫东秦${buildingName}空闲教室表`; // 定义日期占位符
  h1s.forEach((h1) => { // 遍历每个<h1>元素
    if (h1.textContent.includes(timestampPlaceholder2)) { // 如果<h1>元素的文本内容包含占位符
      h1.textContent = `${getBeijingDate()}🏫东秦${buildingName}空闲教室表`; // 将占位符替换为当前的北京日期
    }
  });

  // 步骤 1.5: 预先计算全天空闲的教室集合
  console.log("正在计算全天空闲教室...");
  const allDayFreeClassroomsSet = calculateAllDayFreeClassrooms(); // 调用函数计算全天空闲教室
  console.log(`找到 ${allDayFreeClassroomsSet.size} 个全天空闲教室:`, Array.from(allDayFreeClassroomsSet).join(', ') || '无');


  // 步骤 2: 填充各个时间段的表格数据
  const mainUl = document.querySelector("ul"); // 获取HTML中的主<ul>列表元素
  if (!mainUl) { // 如果未找到主<ul>元素，则输出错误并返回
    console.error("错误：在HTML样板中未找到主 <ul> 元素。");
    return;
  }
  const listItems = Array.from(mainUl.children); // 获取主<ul>下的所有直接子<li>元素，并转换为数组

  let previousSlotAllClassrooms = new Set(); // 初始化一个Set，用于存储上一个已处理时间段的所有空闲教室号

  // 遍历HTML样板中的每个<li>元素
  for (let i = 0; i < listItems.length; i++) {
    const currentLi = listItems[i]; // 获取当前<li>元素
    const currentLiText = currentLi.textContent.trim(); // 获取当前<li>元素的文本内容并去除首尾空格

    // 查找当前<li>的文本是否与timeSlotMappings中定义的某个时间段标签匹配
    const slotMapping = timeSlotMappings.find((m) => m.label === currentLiText);

    if (slotMapping) { // 如果找到了匹配的时间段标签 (例如 "🏙上午第1-2节")
      // 预期下一个<li>元素包含该时间段对应的表格
      if (i + 1 < listItems.length) {
        const tableLi = listItems[i + 1]; // 获取包含表格的<li>元素
        const tableElement = tableLi.querySelector("table"); // 在该<li>中查找<table>元素
        if (!tableElement) { // 如果未找到表格，则输出警告并跳过此时间段
          console.warn(`警告：时间段 "${slotMapping.label}" 后面没有找到表格。`);
          continue;
        }

        // 构建当前时间段对应的JSON文件路径
        const jsonFilePath = path.join(jsonDir, `classroom_results_${buildingNumber}_${slotMapping.fileSuffix}.json`);
        let currentJsonData = null; // 用于存储从JSON文件读取的原始数据
        let processedFloors; // 用于存储处理后的按楼层组织的教室数据

        try {
          // 检查JSON文件是否存在
          if (fs.existsSync(jsonFilePath)) {
            const rawData = fs.readFileSync(jsonFilePath, "utf-8"); // 同步读取文件内容
            currentJsonData = JSON.parse(rawData); // 解析JSON字符串为JavaScript对象
            // 调用processJsonDataForSlot处理当前时间段的数据
            // 传入：当前JSON数据，上一个时间段的教室集合，当前时间段的映射信息，以及全天空闲教室集合
            processedFloors = processJsonDataForSlot(currentJsonData, previousSlotAllClassrooms, slotMapping, allDayFreeClassroomsSet);
          } else { // 如果JSON文件未找到
            console.warn(`警告：JSON文件未找到: ${jsonFilePath}`);
            processedFloors = {}; // 初始化为空对象
            const floorsInTable = ["1F", "2F", "3F", "4F", "5F", "6F", "7F"]; // 表格中预期的楼层
            // 将表格中所有楼层的教室标记为“数据文件缺失”
            for (const floor of floorsInTable) {
              processedFloors[floor] = "数据文件缺失";
            }
          }
        } catch (error) { // 如果读取或解析JSON文件时发生错误
          console.error(`处理文件 ${jsonFilePath} 时发生错误:`, error);
          processedFloors = {}; // 初始化为空对象
          const floorsInTable = ["1F", "2F", "3F", "4F", "5F", "6F", "7F"];
          // 将表格中所有楼层的教室标记为“数据加载/解析失败”
          for (const floor of floorsInTable) {
            processedFloors[floor] = "数据加载/解析失败";
          }
        }

        // 获取表格的<tbody>部分
        const tbody = tableElement.querySelector("tbody");
        if (tbody) { // 如果找到了<tbody>
          const rows = Array.from(tbody.children); // 获取<tbody>中的所有<tr>行
          rows.forEach((row) => { // 遍历每一行
            if (row.cells.length >= 2) { // 确保行至少有两个单元格（楼层和教室）
              const floorCellText = row.cells[0].textContent.trim(); // 获取第一个单元格（楼层）的文本
              const floorKey = floorCellText.replace(buildingName, "").trim(); // 从楼层文本中移除楼名前缀，得到如"1F"的键
              const roomsCell = row.cells[1]; // 获取第二个单元格（教室）
              // 将处理后的教室字符串（可能包含<u>或<strong>标签）填充到单元格的innerHTML中
              // 如果processedFloors中没有对应楼层的数据，则显示"无"
              roomsCell.innerHTML = processedFloors[floorKey] || "无";
            }
          });
        }

        // 为下一个时间段的比较做准备：更新previousSlotAllClassrooms
        // 条件：1. 当前JSON数据成功加载 (currentJsonData不为null)
        //       2. 当前时间段没有被标记为noUnderline (例如，昼间1-8节的数据不应影响后续9-10节的下划线判断)
        if (currentJsonData && !slotMapping.noUnderline) {
            previousSlotAllClassrooms = getAllClassroomsFromData(currentJsonData); // 用当前时间段的教室更新“上一个时间段”的教室集合
        } else if (slotMapping.noUnderline) {
            // 如果当前时间段是noUnderline类型（如昼间1-8节），则previousSlotAllClassrooms保持不变。
            // 这意味着下一个时间段（如果存在）将与昼间1-8节之前的那个时间段进行比较。
        }
      }
      i++; // 因为已经处理了时间段标签和紧随其后的表格，所以循环索引i需要额外增加1，跳过表格的<li>
    }
  }

  // 步骤 3: 将修改后的DOM对象序列化回HTML字符串
  const finalHtml = dom.serialize();

  // 步骤 4: 将最终的HTML字符串写入到指定的输出文件中
  fs.writeFileSync(outputHtmlFile, finalHtml, "utf-8"); // 使用utf-8编码写入
  console.log(`HTML报告已成功生成到: ${outputHtmlFile}`); // 输出成功信息

  // 生成导航页面，方便在各教学楼页面间切换
  generateIndexPage(buildingArg);
}

// 执行主函数，开始生成HTML报告
generateHtmlReport();

// 生成index.html导航页面的函数
function generateIndexPage(selectedBuilding) {
  const options = Object.entries(buildingMap)
    .map(([code, name]) => {
      const selected = code === selectedBuilding ? "selected" : "";
      return `<option value="${code}" ${selected}>${name}</option>`;
    })
    .join("\n");

  const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>空闲教室查询导航</title>
  <style>
    body { text-align:center; font-family: Arial, sans-serif; }
    iframe { width:100%; height:80vh; border:none; }
  </style>
</head>
<body>
  <h1>空闲教室查询导航</h1>
  <select id="indexBuildingSelect">${options}</select>
  <iframe id="buildingFrame" src="${selectedBuilding}.html"></iframe>
  <script>
    const select = document.getElementById('indexBuildingSelect');
    const frame = document.getElementById('buildingFrame');
    select.addEventListener('change', () => {
      frame.src = select.value + '.html';
    });
    setInterval(() => {
      frame.contentWindow.location.reload();
    }, 5 * 60 * 1000); // 每5分钟刷新一次
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, "..", "index.html"), indexHtml, "utf-8");
  console.log("导航页面 index.html 已生成");
}
