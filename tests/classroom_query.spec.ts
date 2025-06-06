import { test, expect } from "@playwright/test"; // 导入 Playwright 测试框架的核心模块 test 和断言模块 expect
import * as fs from "fs"; // 引入Node.js内置的文件系统模块，用于后续将查询结果写入JSON文件
import * as path from "path"; // 引入Node.js内置的路径处理模块，用于安全地构建文件路径

// 定义一个名为 '登录并按多时间段查询空闲教室测试' 的测试用例
// async ({ page }) 表示这是一个异步测试函数，它接收一个 Playwright 的 Page 对象作为参数，用于与浏览器页面交互
test("登录并按多时间段查询空闲教室测试", async ({ page }) => {
  // 为此测试用例设置总超时时间（毫秒）。
  // 由于涉及多次网络请求和页面交互，需要比默认值更长的时间以避免因超时而失败。
  // [可调参数]: 600000 - 如果测试仍然超时，可以根据实际网络和服务器响应情况调整此值。
  test.setTimeout(600000);

  // 定义主要操作之间的固定延迟时间（毫秒）。
  // 用于确保页面有足够的时间加载或响应上一步操作。
  // [可调参数]: 1500 - 根据网站响应速度调整，太短可能导致元素未加载，太长会增加测试总时长。
  const operationDelay = 1500;
  // 定义点击、填充等交互操作后的短延迟时间（毫秒）。
  // [可调参数]: 750 - 类似operationDelay，用于更细粒度的等待。
  const interactionDelay = 750;

  // --- 1. 登录流程 ---
  console.log("正在导航到登录页面..."); // 在控制台输出当前操作的描述，便于追踪测试进度。
  // 使用 page.goto() 方法导航到指定的URL。
  // [可调参数]: 'https://jwxt.neuq.edu.cn/' - 如果目标网站的登录入口URL发生变化，需要更新此字符串。
  await page.goto("https://jwxt.neuq.edu.cn/");
  // 在导航后，等待一段固定的时间，以确保页面资源（如JavaScript）有时间执行和渲染。
  await page.waitForTimeout(operationDelay);

  // 定位用户名输入框。使用ID选择器 '#username'。
  // [可调参数]: '#username' - 如果用户名输入框的HTML `id` 属性改变，此选择器需要更新。
  const usernameInput = page.locator("#username");
  // 等待定位到的用户名输入框在页面上变为可见状态，设置最长等待时间。
  // [可调参数]: timeout: 100000 - 如果页面加载非常缓慢，导致输入框长时间才出现，可以增加此超时值。
  await usernameInput.waitFor({ state: "visible", timeout: 100000 });
  console.log("登录页面已加载。正在填写用户名...");
  // 使用 locator.fill() 方法填充用户名。
  // [重要/可调参数]: 'YOUR_NEUQ_USERNAME' - 必须替换为实际的、有效的测试用户名。
  await usernameInput.fill("YOUR_NEUQ_USERNAME");
  // 在填充操作后，等待一小段时间，确保相关事件（如input事件）被触发。
  await page.waitForTimeout(interactionDelay);

  // 定位密码输入框。使用ID选择器 '#password'。
  // [可调参数]: '#password' - 如果密码输入框的HTML `id` 属性改变，此选择器需要更新。
  const passwordInput = page.locator("#password");
  console.log("正在填写密码...");
  // 使用 locator.fill() 方法填充密码。
  // [重要/可调参数]: 'YOUR_NEUQ_PASSWORD' - 必须替换为实际的、有效的测试密码。
  await passwordInput.fill("YOUR_NEUQ_PASSWORD");
  // 在填充操作后，等待一小段时间。
  await page.waitForTimeout(interactionDelay);

  // 定位登录按钮。使用复合CSS选择器，匹配 `<button>` 元素，
  // 且其 `class` 属性包含 'submitBtn'，`type` 属性为 'submit'。
  // [可调参数]: 'button.submitBtn[type="submit"]' - 如果登录按钮的HTML标签、类名或属性发生变化，此选择器需要更新。
  const loginButton = page.locator('button.submitBtn[type="submit"]');
  console.log("正在点击登录按钮...");
  // 使用 locator.click() 方法点击登录按钮。
  await loginButton.click();

  // 定义登录成功后期望跳转到的主页URL，用于后续验证（当前脚本中未显式验证，但保留此变量有益）。
  // [可调参数]: 'https://jwxt.neuq.edu.cn/eams/homeExt.action' - 如果登录成功后的目标URL改变，需要更新此字符串。
  const homePageURL = "https://jwxt.neuq.edu.cn/eams/homeExt.action";
  // 登录点击后，等待一段时间，让服务器处理登录请求并完成页面跳转和主页内容的加载。
  // 注意：更健壮的做法是使用 `page.waitForURL(homePageURL)` 或等待主页上的某个特定元素出现。
  await page.waitForTimeout(operationDelay);

  // --- 2. 导航到空闲教室查询页面 ---
  // 定义空闲教室查询页面的URL。
  // [可调参数]: 'https://jwxt.neuq.edu.cn/eams/classroom/apply/free.action' - 如果此页面的URL改变，需要更新。
  const freeClassroomURL =
    "https://jwxt.neuq.edu.cn/eams/classroom/apply/free.action";
  console.log(`正在导航到空闲教室查询页面: ${freeClassroomURL}`);
  // 导航到空闲教室查询页面。
  await page.goto(freeClassroomURL);

  // 定位空闲教室查询页面的主查询表单容器。使用ID选择器 '#actionForm'。
  // [可调参数]: '#actionForm' - 如果查询表单容器的HTML `id` 属性改变，此选择器需要更新。
  const queryForm = page.locator("#actionForm");
  // 等待查询表单容器在页面上变为可见状态，设置最长等待时间。
  // [可调参数]: timeout: 30000 - 如果查询页面加载缓慢，可增加此超时值。
  await queryForm.waitFor({ state: "visible", timeout: 30000 });
  console.log("空闲教室查询页面已加载。");
  // 等待一段固定的时间，让页面上的JavaScript和元素初始化完成。
  await page.waitForTimeout(operationDelay);

  // --- 3. 定义要查询的时间段 ---
  // `timeSlots` 是一个对象数组，每个对象定义了一个要查询的时间段及其相关信息。
  // `begin`: 起始小节的数字字符串。
  // `end`: 结束小节的数字字符串。
  // `fileSuffix`: 用于构成输出JSON文件名的后缀，以区分不同时间段的结果。
  // [可调参数]: 可以修改此数组来增删或改变要查询的时间段组合。
  const timeSlots = [
    { begin: "1", end: "2", fileSuffix: "1-2" },
    { begin: "3", end: "4", fileSuffix: "3-4" },
    { begin: "5", end: "6", fileSuffix: "5-6" },
    { begin: "7", end: "8", fileSuffix: "7-8" },
    { begin: "1", end: "8", fileSuffix: "1-8" }, // 例如，查询整个白天的课
    { begin: "9", end: "10", fileSuffix: "9-10" },
    { begin: "11", end: "12", fileSuffix: "11-12" },
  ];

  // --- 4. 表单预设操作 (在循环查询所有时间段之前，执行一次的初始化步骤) ---

  // 异步辅助函数：用于在WDatePicker日期选择器中选择“今天”的日期。
  // 参数 `dateInputElementSelector`: 目标日期输入框的CSS选择器字符串 (例如 '#dateBegin')。
  // 参数 `inputFieldName`: 日期输入框的描述性名称 (例如 '起始日期 (dateBegin)')，主要用于日志输出。
  async function selectTodayInDatePicker(
    dateInputElementSelector: string,
    inputFieldName: string
  ) {
    console.log(
      `正在点击 ${inputFieldName} 输入框: ${dateInputElementSelector}`
    );
    // 点击日期输入框以触发WDatePicker日期选择器的显示。
    // [可调参数]: `dateInputElementSelector` (作为函数参数传入) - 如果日期输入框的ID或类名改变，调用此函数时传入的选择器需相应更新。
    await page.locator(dateInputElementSelector).click();
    // 等待1秒，给予WDatePicker足够的时间弹出。
    // [可调参数]: 1000 - 如果日期选择器弹出较慢，可适当增加此等待时间。
    await page.waitForTimeout(1000);

    // WDatePicker通常嵌入在一个iframe中。首先尝试使用常见的ID '#_my97DP' 定位此iframe。
    // [可调参数]: 'iframe#_my97DP' - 这是My97DatePicker iframe的常见ID。如果实际ID不同，需修改。
    let datePickerFrame = page.frameLocator("iframe#_my97DP");
    // 检查iframe是否加载并可见，设置3秒超时。
    // [可调参数]: timeout: 3000 - 如果iframe加载慢，可增加。
    let isFrameVisible = await datePickerFrame
      .locator("body")
      .isVisible({ timeout: 3000 });

    // 如果通过ID未找到可见的iframe，则尝试使用备用选择器，匹配`src`属性中包含'My97DatePicker.htm'的iframe。
    // 这是因为有些网站可能不使用固定ID，或者ID会变化。
    if (!isFrameVisible) {
      console.log(
        '未找到iframe#_my97DP或其不可见，尝试备用选择器 iframe[src*="My97DatePicker.htm"]'
      );
      // [可调参数]: 'iframe[src*="My97DatePicker.htm"]' - 如果iframe的`src`特征改变，需修改。
      datePickerFrame = page.frameLocator('iframe[src*="My97DatePicker.htm"]');
      isFrameVisible = await datePickerFrame
        .locator("body")
        .isVisible({ timeout: 3000 }); // 再次检查可见性
    }

    // 如果两种方式都找不到可见的iframe，则输出错误信息并返回false，表示日期选择失败。
    if (!isFrameVisible) {
      console.error(
        `WDatePicker的iframe (${inputFieldName}) 未找到或不可见。无法选择日期。`
      );
      // 尝试再次点击日期输入框，希望能关闭可能存在的非iframe日期选择器，避免干扰后续操作。
      // 设置短超时，并捕获可能的错误（如果元素已消失）。
      await page
        .locator(dateInputElementSelector)
        .click({ timeout: 500 })
        .catch(() => {});
      return false; // 返回false表示操作失败
    }

    // 在日期选择器的iframe内部，定位“Today”按钮。
    // 按钮通常是`<input type="button">`元素，其`value`属性为"Today"。
    // [可调参数]: 'input[type="button"][value="Today"]' - 如果“今天”按钮的文本/`value`属性是中文“今天”或其他值，或者其HTML标签/属性改变，需更新此选择器。
    const todayButton = datePickerFrame.locator(
      'input[type="button"][value="Today"]'
    );
    // 等待“Today”按钮在iframe中可见，最长等待5秒。
    // [可调参数]: timeout: 5000 - 如果按钮加载慢，可增加。
    if (await todayButton.isVisible({ timeout: 5000 })) {
      await todayButton.click(); // 点击“Today”按钮
      console.log(`已为 ${inputFieldName} 选择 "Today"。`);
      // 等待日期选择器将选定的日期值填充回主页面的日期输入框中。
      // 使用 `page.waitForFunction` 在浏览器上下文中执行一个JavaScript函数，直到该函数返回true。
      // 这个函数检查指定选择器的输入框的`value`属性是否不再为空字符串。
      // [可调参数]: timeout: 5000 - 如果日期填充回主页面输入框较慢，可增加。
      await page.waitForFunction(
        (selector) => // 浏览器端执行的函数
          (document.querySelector(selector as string) as HTMLInputElement) // 获取输入框元素
            ?.value !== "", // 检查其值是否非空
        dateInputElementSelector, // 将日期输入框的选择器作为参数传给浏览器端函数
        { timeout: 5000 } // 等待条件满足的超时时间
      );
      console.log(`${inputFieldName} 输入框已填充日期。`);
      return true; // 日期选择成功，返回true
    } else { // 如果未找到“Today”按钮
      console.error(
        `在WDatePicker中未找到 "${inputFieldName}" 的 "Today" 按钮。`
      );
      // 如果未找到“Today”按钮，尝试找到并点击“清空”、“Clear”、“确定”或“OK”按钮来关闭日期选择器，以防它遮挡页面。
      // [可调参数]: 'input[value="清空"], input[value="Clear"], input[value="确定"], input[value="OK"]' - 如果关闭/清除按钮的`value`或其他属性改变，需更新。
      const closeButton = datePickerFrame
        .locator(
          'input[value="清空"], input[value="Clear"], input[value="确定"], input[value="OK"]'
        )
        .first(); // 选择第一个匹配的关闭按钮
      if (await closeButton.isVisible({ timeout: 500 })) { // 短暂等待关闭按钮是否可见
        await closeButton.click(); // 点击关闭按钮
      }
      return false; // 日期选择失败，返回false
    }
  }

  // 步骤 4.1: 设置“教室使用日期” - 此操作在所有时间段查询之前仅执行一次。
  // 调用辅助函数 `selectTodayInDatePicker`，为“起始日期”输入框（ID为'#dateBegin'）选择“今天”。
  // [可调参数]: '#dateBegin' - 如果起始日期输入框的ID改变，需更新。
  const dateBeginSuccess = await selectTodayInDatePicker(
    "#dateBegin", // 起始日期输入框的选择器
    "起始日期 (dateBegin)" // 日志中显示的字段名
  );
  // 如果起始日期设置失败（例如，日期选择器未正常工作），则输出错误并终止测试。
  if (!dateBeginSuccess) {
    console.error("设置 '起始日期' 失败。正在中止后续表单操作。");
    return; // 终止当前测试的执行
  }
  await page.waitForTimeout(interactionDelay); // 在操作后短暂等待

  // 调用辅助函数，为“结束日期”输入框（ID为'#dateEnd'）选择“今天”。
  // [可调参数]: '#dateEnd' - 如果结束日期输入框的ID改变，需更新。
  const dateEndSuccess = await selectTodayInDatePicker(
    "#dateEnd", // 结束日期输入框的选择器
    "结束日期 (dateEnd)" // 日志中显示的字段名
  );
  // 如果结束日期设置失败，则输出错误并终止测试。
  if (!dateEndSuccess) {
    console.error("设置 '结束日期' 失败。正在中止后续表单操作。");
    return; // 终止当前测试的执行
  }
  await page.waitForTimeout(operationDelay); // 在日期设置完成后，进行一个较长的等待，准备后续操作。

  // --- 5. 遍历定义好的时间段，执行查询并保存结果 ---
  // 循环遍历 `timeSlots` 数组中的每个时间段对象。
  for (const slot of timeSlots) {
    // 为当前时间段的查询操作创建一个计时器标签，用于在控制台输出该操作的耗时。
    const queryLabel = `QueryForSlot_${slot.fileSuffix}`;
    console.time(queryLabel); // 开始计时

    console.log(`\n--- 正在为时间段 ${slot.fileSuffix} 执行查询 ---`); // 输出当前正在处理的时间段信息

    // 步骤 5.1: 填写当前时间段的“教室使用小节”
    // 定位“教室使用小节：”的起始小节输入框。使用`name`属性选择器。
    // [可调参数]: 'input[name="timeBegin"]' - 如果起始小节输入框的`name`属性或其他定位依据改变，需更新。
    const timeBeginInput = page.locator('input[name="timeBegin"]');
    // 定位“教室使用小节：”的结束小节输入框。使用`name`属性选择器。
    // [可调参数]: 'input[name="timeEnd"]' - 如果结束小节输入框的`name`属性或其他定位依据改变，需更新。
    const timeEndInput = page.locator('input[name="timeEnd"]');

    console.log(`正在填写 "教室使用小节：" 从 ${slot.begin} 到 ${slot.end}...`);
    // 使用当前时间段对象 `slot` 中的 `begin` 属性值填充起始小节输入框。
    await timeBeginInput.fill(slot.begin);
    await page.waitForTimeout(interactionDelay / 2); // 在两次填充之间加入一个非常短的等待
    // 使用当前时间段对象 `slot` 中的 `end` 属性值填充结束小节输入框。
    await timeEndInput.fill(slot.end);
    await page.waitForTimeout(interactionDelay); // 填充完成后短暂等待

    // 步骤 5.2: 点击“查询”按钮以获取当前时间段的结果
    // 定位“查询”按钮。
    // [可调参数]: 'input[type="button"][value="查询"]' - 如果查询按钮的HTML标签、属性或文本改变，需更新。
    const queryButton = page.locator('input[type="button"][value="查询"]');
    console.log('正在点击 "查询" 按钮...');
    // 点击“查询”按钮，提交当前时间段的查询。
    await queryButton.click();
    // 等待查询结果区域加载，确保分页栏元素可见。这对于后续设置每页数量很重要。
    // [可调参数]: '#freeRoomList .grid-bar' - 分页栏的父容器或特定分页元素的CSS选择器。
    // await page.locator('#freeRoomList .grid-bar').waitFor({ state: 'visible', timeout: 20000 }); // 确保分页栏出现
    console.log('查询已提交，等待结果区域和分页栏加载...');
    await page.waitForTimeout(operationDelay); // 等待结果初步加载

    // 步骤 5.3: 为当前查询结果设置每页显示数量为1000
    console.log("正在为当前查询结果设置每页显示数量为1000...");
    // 定位并点击“点击改变每页数据量”的元素。
    // [可调参数]: '[title="点击改变每页数据量"]' - 如果此元素的`title`属性或其他定位依据改变，需更新。
    const changePageSizeLink = page
      .locator("#freeRoomList") // 假设分页控件在ID为'freeRoomList'的元素内
      .locator('[title="点击改变每页数据量"]') // 定位具有特定title的元素
      .first(); // 选择第一个匹配的元素
    // 等待元素可见，以防上一步查询后DOM更新延迟
    await changePageSizeLink.waitFor({ state: 'visible', timeout: 15000 });
    await changePageSizeLink.click(); // 点击此链接/按钮以显示更改每页数量的控件
    await page.waitForTimeout(interactionDelay); // 等待下拉菜单或相关控件出现

    // 定位用于选择每页显示数量的下拉框。
    // [可调参数]: 'select.pgbar-selbox[title="每页数据量"]' - 如果下拉框的标签、类名或`title`属性改变，需更新。
    const pageSizeSelect = page
      .locator("#freeRoomList") // 假设控件在'#freeRoomList'内
      .locator('select.pgbar-selbox[title="每页数据量"]') // 定位下拉框
      .first(); // 选择第一个匹配的下拉框
    await pageSizeSelect.waitFor({ state: "visible", timeout: 10000 }); // 等待下拉框可见
    // 选择下拉框中值为"1000"的选项。
    // [可调参数]: '1000' - 如果“每页1000”选项的实际`value`属性值不同，需更新。
    await pageSizeSelect.selectOption({ value: "1000" });
    await page.waitForTimeout(interactionDelay); // 等待选择操作完成

    // 定位并点击应用更改的“Go”或“确定”按钮。
    // [可调参数]: '.pgbar-go[name="gogo"]' - 如果此按钮的类名、`name`属性或HTML标签改变，需更新。
    const goButton = page
      .locator("#freeRoomList") // 假设按钮在'#freeRoomList'内
      .locator('.pgbar-go[name="gogo"]') // 定位按钮
      .first(); // 选择第一个匹配的按钮
    await goButton.waitFor({ state: "visible", timeout: 10000 }); // 等待按钮可见
    await goButton.click(); // 点击按钮以应用每页显示1000条的设置
    console.log("已设置每页显示1000条。等待数据重新加载...");
    // 在更改每页显示数量后，页面会重新加载查询结果。
    // 使用 `page.waitForFunction` 等待结果区域 `#freeRoomList` 的内容更新。
    // [可调参数]: timeout: 25000 - 等待数据重新加载的超时时间。
    // [可调参数]: 内部判断逻辑 - 如果空结果或加载中的表示方式改变，此逻辑需调整。
    await page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector as string);
        return (
          element &&
          element.innerHTML.trim() !== "" &&
          element.innerHTML.trim() !== "..."
        );
      },
      "#freeRoomList",
      { timeout: 25000 }
    );
    console.log("数据已按新分页设置重新加载。");
    await page.waitForTimeout(operationDelay); // 等待页面完全稳定

    // 步骤 5.4: 解析并保存当前时间段的查询结果
    // 定位用于显示查询结果的`<div>`元素。
    // [可调参数]: '#freeRoomList' - 如果结果显示区域的HTML `id` 属性改变，需更新。
    const resultsDiv = page.locator("#freeRoomList");
    // console.log("正在等待查询结果在 #freeRoomList 中加载..."); // 此日志在上面已有，此处可省略

    // 为等待结果加载的操作创建一个计时器标签（虽然上面已等待，但这里是针对解析前最后确认）。
    const waitForResultsLabel = `WaitForResults_${slot.fileSuffix}`;
    console.time(waitForResultsLabel); // 开始计时
    try {
      // 再次确认结果区域已填充内容。
      await page.waitForFunction(
        (selector) => {
          const element = document.querySelector(selector as string);
          return (
            element &&
            element.innerHTML.trim() !== "" &&
            element.innerHTML.trim() !== "..."
          );
        },
        "#freeRoomList",
        { timeout: 25000 } // 增加单个结果等待的超时时间
      );
      console.timeEnd(waitForResultsLabel); // 结束计时
      console.log("查询结果已确认加载，准备解析。");
    } catch (e) { // 如果等待超时或发生其他错误
      console.timeEnd(waitForResultsLabel); // 确保计时器结束
      console.error(`为时间段 ${slot.fileSuffix} 确认结果加载超时或发生错误。`);
      const currentHTML = await resultsDiv
        .innerHTML()
        .catch(() => "无法获取 #freeRoomList 的innerHTML");
      console.log(`#freeRoomList 的当前HTML内容: ${currentHTML}`);
      console.timeEnd(queryLabel); // 确保整个查询操作的计时器也结束
      continue; // 跳过当前时间段的后续处理，继续下一个时间段
    }
    await page.waitForTimeout(operationDelay); // 等待内容稳定

    // --- JSON数据解析和文件写入逻辑 (与之前版本相同) ---
    // 假设查询结果是以HTML表格的形式展现在 `#freeRoomList` 内部的第一个`<table>`元素中。
    // [可调参数]: .locator('table').first() - 如果结果不在第一个表格，或有多个表格需要更精确的定位，需修改此选择器。
    const tableElement = resultsDiv.locator("table").first();
    const jsonData: Array<Record<string, string>> = [];

    if (await tableElement.isVisible({ timeout: 10000 })) {
      console.log("在结果中找到表格。正在解析数据...");
      let headers: string[] = [];
      const headerElements = await tableElement.locator("thead tr th").all();

      if (headerElements.length > 0) {
          headers = await Promise.all(
            headerElements.map(async (h) =>
              ((await h.textContent()) || "").trim()
            )
          );
      } else {
          console.log(
            "未找到 <thead><th> 表头。可能需要使用通用列名或将第一行数据作为表头。"
          );
      }

      const rows = await tableElement.locator("tbody tr").all();
      console.log(`在表格中找到 ${rows.length} 行数据。`);

      for (const row of rows) {
        const cells = await row.locator("td").all();
        const rowData: Record<string, string> = {};
        for (let i = 0; i < cells.length; i++) {
          const cellText = ((await cells[i].textContent()) || "").trim();
          const headerName = headers[i] || `column${i + 1}`;
          rowData[headerName] = cellText;
        }
        if (Object.keys(rowData).length > 0) {
          jsonData.push(rowData);
        }
      }

      if (jsonData.length > 0) {
          const outputFileName = `classroom_results_${slot.fileSuffix}.json`;
          const outputDirectory = "output";

          if (!fs.existsSync(outputDirectory)) {
            try {
              fs.mkdirSync(outputDirectory, { recursive: true });
              console.log(`输出目录 ${outputDirectory} 已创建。`);
            } catch (mkdirError) {
              console.error(`创建输出目录 ${outputDirectory} 失败:`, mkdirError);
              console.timeEnd(queryLabel);
              continue;
            }
          }
          const outputFilePath = path.join(outputDirectory, outputFileName);
          try {
            fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
            console.log(
              `\n--- 时间段 ${slot.fileSuffix} 的查询结果已保存到 ${outputFilePath} ---`
            );
          } catch (writeError) {
            console.error(`写入文件 ${outputFilePath} 失败:`, writeError);
          }
      } else {
          console.log(
            `时间段 ${slot.fileSuffix}: 未从表格中解析到数据行，或表格为空。`
          );
          const resultsHTMLContent = await resultsDiv.innerHTML();
          console.log(`#freeRoomList 的原始HTML内容 (供调试):`);
          console.log(resultsHTMLContent);
      }
    } else {
      console.log(
        `时间段 ${slot.fileSuffix}: 在 #freeRoomList 中未找到表格。转储原始文本内容:`
      );
      const resultsTextContent = await resultsDiv.textContent();
      console.log(resultsTextContent);
    }

    console.timeEnd(queryLabel); // 结束当前时间段查询操作的总计时
    await page.waitForTimeout(operationDelay); // 在开始下一个时间段的查询之前，等待一段固定时间。
  } // for循环结束，完成所有定义时间段的查询

  console.log("\n所有时间段查询测试脚本执行完毕。"); // 测试结束的标志性输出
}); // 测试用例函数结束