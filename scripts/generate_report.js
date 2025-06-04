const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// HTML 样板字符串
const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>东秦工学馆空闲教室表</title>
    <style>
        body {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 30px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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
        }

        a {
            text-decoration: none;
            color: #2c3e50;
            font-weight: 500;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <h1>current-date 东秦工学馆空闲教室表</h1>
    <p>本空闲教室表更新于YYYY/MM/DD HH:MM</p>
    <p>Powered by Tsiaohan Wang</p>
    <hr>
    <ul>
        <li>上午第1-2节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>上午第3-4节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>下午第5-6节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>下午第7-8节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>晚上第9-10节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>晚上第11-12节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
        <li>昼间第1-8节</li>
        <li>
            <table align="center" border="1" width="100%" cellpadding="5" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>楼层</th>
                        <th>教室</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>工学馆1F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆2F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆3F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆4F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆5F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆6F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                    <tr>
                        <td>工学馆7F</td>
                        <td>“这里填写对应的教室号，以空格分隔”</td>
                    </tr>
                </tbody>
            </table>
        </li>
    </ul>
    <hr>
</body>

</html>
`;

// JSON文件所在的目录 (父目录下的output文件夹)
const jsonDir = path.join(__dirname, "..", "output");
// 生成的HTML文件名
const outputHtmlFile = path.join(__dirname, "..", "index.html");

// 时间段标签与JSON文件后缀的映射
const timeSlotMappings = [
  { label: "上午第1-2节", fileSuffix: "1-2" },
  { label: "上午第3-4节", fileSuffix: "3-4" },
  { label: "下午第5-6节", fileSuffix: "5-6" },
  { label: "下午第7-8节", fileSuffix: "7-8" },
  { label: "晚上第9-10节", fileSuffix: "9-10" },
  { label: "晚上第11-12节", fileSuffix: "11-12" },
  { label: "昼间第1-8节", fileSuffix: "1-8" },
];

// 辅助函数：获取当前北京时间并格式化
function getBeijingTime() {
  const now = new Date();
  // 通过Intl.DateTimeFormat获取指定时区的格式化时间更可靠
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai", // 北京时间对应的时区
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;
  return `${getPart("year")}/${getPart("month")}/${getPart("day")} ${getPart(
    "hour"
  )}:${getPart("minute")}`;
}
function getBeijingDate() {
  const now = new Date();
  // 通过Intl.DateTimeFormat获取指定时区的格式化时间更可靠
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai", // 北京时间对应的时区
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;
  return `${getPart("year")}/${getPart("month")}/${getPart("day")}`;
}

// 辅助函数：处理单个JSON文件数据，按楼层组织教室号
function processJsonDataForSlot(jsonData) {
  const floorsData = {
    "1F": [],
    "2F": [],
    "3F": [],
    "4F": [],
    "5F": [],
    "6F": [],
    "7F": [],
  };

  if (!jsonData || !Array.isArray(jsonData)) {
    console.warn("提供的JSON数据无效或为空数组");
    for (const floorKey in floorsData) {
      floorsData[floorKey] = "数据解析错误"; // 标记错误
    }
    return floorsData;
  }

  for (const entry of jsonData) {
    // 确保只处理工学馆的教室，并且“名称”字段存在
    if (entry["教学楼"] === "工学馆" && entry["名称"]) {
      let classroomName = entry["名称"];
      // 从教室名称中移除"工学馆"前缀
      if (classroomName.startsWith("工学馆")) {
        classroomName = classroomName.substring("工学馆".length).trim();
      }

      // 仅处理纯数字的教室号（例如 "101", "410"），忽略其他特殊条目
      if (/^\d+$/.test(classroomName)) {
        const floorDigit = classroomName.charAt(0); // 获取教室号的第一个数字作为楼层标识
        const floorKey = `${floorDigit}F`; // 拼接成 "XF" 格式
        if (floorsData.hasOwnProperty(floorKey)) {
          floorsData[floorKey].push(classroomName);
        } else {
          // console.warn(`未知的楼层key: ${floorKey} 来自教室 ${entry["名称"]}`);
        }
      }
    }
  }

  // 将各楼层的教室号数组排序并转换为空格分隔的字符串
  for (const floorKey in floorsData) {
    if (floorsData[floorKey].length > 0) {
      floorsData[floorKey] = floorsData[floorKey]
        .sort((a, b) => parseInt(a) - parseInt(b))
        .join(" ");
    } else {
      floorsData[floorKey] = "无"; // 如果该楼层没有符合条件的空闲教室，则显示"无"
    }
  }
  return floorsData;
}

// 主处理函数
function generateHtmlReport() {
  const dom = new JSDOM(htmlTemplate); // 使用JSDOM解析HTML样板
  const document = dom.window.document;

  // 1. 更新时间戳
  const paragraphs = document.querySelectorAll("p");
  const timestampPlaceholder1 = "本空闲教室表更新于YYYY/MM/DD HH:MM";
  paragraphs.forEach((p) => {
    if (p.textContent.includes(timestampPlaceholder1)) {
      p.textContent = `本空闲教室表更新于${getBeijingTime()}`;
    }
  });
    const h1s = document.querySelectorAll("h1");
const timestampPlaceholder2 = "current-date 东秦工学馆空闲教室表";
  h1s.forEach((h1) => {
    if (h1.textContent.includes(timestampPlaceholder2)) {
      h1.textContent = `${getBeijingDate()} 东秦工学馆空闲教室表`;
    }
  });

  // 2. 填充各个时间段的表格数据
  const mainUl = document.querySelector("ul"); // 获取主列表
  if (!mainUl) {
    console.error("错误：在HTML样板中未找到主 <ul> 元素。");
    return;
  }
  const listItems = Array.from(mainUl.children); // 获取所有 <li> 子元素

  let mappingIndex = 0; // 用于追踪 timeSlotMappings 的当前索引

  for (let i = 0; i < listItems.length; i++) {
    const currentLi = listItems[i];
    const currentLiText = currentLi.textContent.trim();

    // 检查当前 <li> 是否是时间段标签
    const slotMapping = timeSlotMappings.find((m) => m.label === currentLiText);

    if (slotMapping) {
      // 找到了时间段标签，下一个 <li> 应该包含表格
      if (i + 1 < listItems.length) {
        const tableLi = listItems[i + 1];
        const tableElement = tableLi.querySelector("table");
        if (!tableElement) {
          console.warn(
            `警告：时间段 "${slotMapping.label}" 后面没有找到表格。`
          );
          continue;
        }

        const jsonFilePath = path.join(
          jsonDir,
          `classroom_results_${slotMapping.fileSuffix}.json`
        );
        let processedFloors;

        try {
          if (fs.existsSync(jsonFilePath)) {
            const rawData = fs.readFileSync(jsonFilePath, "utf-8");
            const jsonData = JSON.parse(rawData);
            processedFloors = processJsonDataForSlot(jsonData);
          } else {
            console.warn(`警告：JSON文件未找到: ${jsonFilePath}`);
            processedFloors = {}; // 标记为数据加载失败
            const floorsInTable = ["1F", "2F", "3F", "4F", "5F", "6F", "7F"];
            for (const floor of floorsInTable) {
              processedFloors[floor] = "数据文件缺失";
            }
          }
        } catch (error) {
          console.error(`处理文件 ${jsonFilePath} 时发生错误:`, error);
          processedFloors = {}; // 标记为数据加载失败
          const floorsInTable = ["1F", "2F", "3F", "4F", "5F", "6F", "7F"];
          for (const floor of floorsInTable) {
            processedFloors[floor] = "数据加载/解析失败";
          }
        }

        // 填充表格行
        const tbody = tableElement.querySelector("tbody");
        if (tbody) {
          const rows = Array.from(tbody.children);
          rows.forEach((row) => {
            if (row.cells.length >= 2) {
              const floorCellText = row.cells[0].textContent.trim(); // "工学馆XF"
              const floorKey = floorCellText.replace("工学馆", "").trim(); // "XF"
              const roomsCell = row.cells[1];
              roomsCell.textContent = processedFloors[floorKey] || "无";
            }
          });
        }
      }
      i++; // 跳过包含表格的 <li>，因为它已经被处理了
    }
  }

  // 3. 将修改后的DOM序列化回HTML字符串
  const finalHtml = dom.serialize();

  // 4. 将HTML字符串写入文件
  fs.writeFileSync(outputHtmlFile, finalHtml, "utf-8");
  console.log(`HTML报告已成功生成到: ${outputHtmlFile}`);
}

// 执行生成报告的函数
generateHtmlReport();
