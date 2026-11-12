// 自动截取原型的关键界面，用于合成演示视频
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ROOT = "C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01";
const FILE = "file:///C:/Users/pc/Documents/Trae-CN/temp_20261024_01/选课参考信息模块-高保真原型.html";

// 每一步：name、说明、可选的前置 JS、可选的点击选择器
const SHOTS = [
  { name: "01-list-student", js: `state.role='student';state.page='list';render();` },
  { name: "02-detail-intro", js: `state.role='student';state.page='detail';state.detailId='c1';state.detailTab='intro';render();` },
  { name: "03-detail-review", js: `state.role='student';state.page='detail';state.detailId='c1';state.detailTab='review';render();` },
  { name: "04-detail-teacher", js: `state.role='student';state.page='detail';state.detailId='c1';state.detailTab='teacher';render();` },
  { name: "05-eligible-list", js: `state.role='eligible';state.page='list';render();` },
  { name: "06-review-form", js: `state.role='eligible';state.page='detail';state.detailId='c1';state.detailTab='review';render();`, click: `[data-act="startReview"]` },
  { name: "07-admin-audit", js: `state.role='admin';state.page='audit';state.auditTab='review';render();` },
  { name: "08-admin-intro-queue", js: `state.role='admin';state.page='audit';state.auditTab='intro';render();` },
  { name: "09-teacher-courses", js: `state.role='teacher';state.page='tcourses';render();` },
  { name: "10-teacher-detail", js: `state.role='teacher';state.page='detail';state.detailId='c1';state.detailTab='review';render();` },
  { name: "11-window-closed", js: `DATA.cfg.windowOpen=false;state.role='student';state.page='detail';state.detailId='c1';state.detailTab='review';render();` },
  { name: "12-admin-intro-edit", js: `DATA.cfg.windowOpen=true;state.role='admin';state.page='audit';state.auditTab='missing';render();`, click: `[data-act="adminEdit"]` },
  { name: "13-final-list", js: `state.role='student';state.page='list';render();` },
];

(async () => {
  const outDir = path.join(ROOT, "shots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1.5", "--font-render-hinting=none"],
    defaultViewport: { width: 1280, height: 720, deviceScaleFactor: 1.5 },
  });

  const page = await browser.newPage();
  const url = FILE + "?cb=" + Date.now();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  for (const s of SHOTS) {
    try {
      if (s.js) {
        await page.evaluate(s.js);
        await new Promise(r => setTimeout(r, 450));
      }
      if (s.click) {
        const el = await page.$(s.click);
        if (el) {
          await el.click();
          await new Promise(r => setTimeout(r, 600));
        } else {
          console.log("  [警告] 未找到元素", s.click);
        }
      }
      const file = path.join(outDir, s.name + ".png");
      await page.screenshot({ path: file });
      const st = await page.evaluate(() => state.page + " / " + state.role);
      console.log("OK", s.name, "->", st);
    } catch (e) {
      console.log("FAIL", s.name, e.message);
    }
  }

  await browser.close();
  console.log("截图完成，输出目录:", outDir);
})();
