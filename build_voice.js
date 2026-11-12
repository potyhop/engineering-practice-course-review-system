// 口播视频合成：TTS 音频 + 原型截图 + 字幕 → MP4
const { execFileSync, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ROOT = "C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01";
const ffmpeg = path.join(ROOT, "node_modules", "@ffmpeg-installer", "win32-x64", "ffmpeg.exe");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const FILE = "file:///C:/Users/pc/Documents/Trae-CN/temp_20261024_01/选课参考信息模块-高保真原型.html";

// 7 段 + 对应界面 + 字幕
const SEGS = [
  { id: "01", title: "开场",  js: `state.role='student';state.page='list';render();`,
    cap: "工程项目认知实践 · 口播分享\n从 0 到 1 完成一个 AI 应用" },
  { id: "02", title: "项目启动", js: `state.role='student';state.page='detail';state.detailId='c1';state.detailTab='review';render();`,
    cap: "痛点：选课系统信息缺失\n每届学生踩同样的坑" },
  { id: "03", title: "设计阶段", js: `state.role='admin';state.page='audit';state.auditTab='review';render();`,
    cap: "PRD 先行，把边界想清楚\n权限 · 审核 · 窗口" },
  { id: "04", title: "AI 能力", js: `state.role='eligible';state.page='detail';state.detailId='c2';state.detailTab='review';render();`,
    cap: "AI 合规预审 + AI 亮点提取\n不是装饰，是真帮上" },
  { id: "05", title: "技术实现", js: `state.role='teacher';state.page='tcourses';render();`,
    cap: "纯前端单文件 · 零依赖\n双击即运行，逻辑不简单" },
  { id: "06", title: "收获", js: `state.role='student';state.page='list';render();`,
    cap: "① 从用户痛点出发\n② AI 是核心差异点\n③ 原型比 PPT 有用" },
  { id: "07", title: "结尾", js: `state.role='student';state.page='list';render();`,
    cap: "感谢课程 · 感谢伙伴\n谢谢大家！" },
];

const voiceDir = path.join(ROOT, "voice");
const outSegDir = path.join(ROOT, "voice_segs");
if (!fs.existsSync(outSegDir)) fs.mkdirSync(outSegDir);

// 字体
const FONT_LOCAL = path.join(ROOT, "msyh.ttc");
if (!fs.existsSync(FONT_LOCAL)) {
  const candidates = ["C:\\Windows\\Fonts\\msyh.ttc", "C:\\Windows\\Fonts\\msyhbd.ttc", "C:\\Windows\\Fonts\\simhei.ttf"];
  for (const c of candidates) { if (fs.existsSync(c)) { fs.copyFileSync(c, FONT_LOCAL); break; } }
}

// Step 1: 自动截取 7 张图
console.log("=== 截取界面 ===");
(async () => {
  const puppeteer = require("puppeteer-core");
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1.5"],
    defaultViewport: { width: 1280, height: 720, deviceScaleFactor: 1.5 },
  });
  const page = await browser.newPage();
  await page.goto(FILE + "?cb=" + Date.now(), { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1000));

  for (const s of SEGS) {
    await page.evaluate(s.js);
    await new Promise(r => setTimeout(r, 500));
    const pic = path.join(voiceDir, "pic" + s.id + ".png");
    await page.screenshot({ path: pic });
    console.log("  截图", s.id, s.title);
  }
  await browser.close();

  // Step 2: 合成每段
  console.log("=== 合成视频段 ===");
  const list = [];

  for (const s of SEGS) {
    const wav = path.join(voiceDir, "seg" + s.id + ".wav");
    const pic = path.join(voiceDir, "pic" + s.id + ".png");
    const out = path.join(outSegDir, "seg" + s.id + ".mp4");
    const capFile = path.join(voiceDir, "cap" + s.id + ".txt");
    fs.writeFileSync(capFile, s.cap, "utf8");

    // 用 ffmpeg 读取 WAV 时长（stderr 里有 Duration）
    let dur = 0;
    try {
      const out = execSync(`"${ffmpeg}" -i "${wav}"`, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" });
    } catch (e) {
      const m = (e.stderr || "").match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
      if (m) dur = parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseFloat(m[3]);
    }
    if (!dur) dur = 20; // 兜底 20 秒
    dur += 0.3;

    const vf = [
      "scale=1920:1080",
      "drawbox=x=0:y=0:w=iw:h=60:color=0x028090@0.90:t=fill",
      "drawtext=fontfile=msyh.ttc:text=" + s.id + " - " + s.title + ":fontcolor=white:fontsize=24:x=20:y=20",
      "drawbox=x=0:y=ih-200:w=iw:h=200:color=0x01343A@0.94:t=fill",
      "drawtext=fontfile=msyh.ttc:textfile=voice/cap" + s.id + ".txt:fontcolor=white:fontsize=32:line_spacing=14:x=(w-text_w)/2:y=h-130",
    ].join(",");

    const args = [
      "-y", "-loop", "1", "-framerate", "30", "-i", "voice/pic" + s.id + ".png",
      "-i", "voice/seg" + s.id + ".wav",
      "-t", dur.toFixed(2),
      "-vf", vf,
      "-c:v", "libx264", "-preset", "medium", "-crf", "20",
      "-c:a", "aac", "-b:a", "128k",
      "-pix_fmt", "yuv420p",
      "-shortest",
      "voice_segs/seg" + s.id + ".mp4",
    ];

    try {
      execFileSync(ffmpeg, args, { cwd: ROOT, stdio: "pipe" });
      list.push(out);
      console.log("  OK seg" + s.id + ".mp4 (" + dur.toFixed(1) + "s)  " + s.title);
    } catch (e) {
      console.log("  FAIL seg" + s.id, e.message);
    }
  }

  // Step 3: 拼接
  if (list.length) {
    const listFile = path.join(outSegDir, "list.txt");
    fs.writeFileSync(listFile, list.map(f => "file '" + path.basename(f) + "'").join("\n"), "utf8");
    const finalOut = path.join(ROOT, "5-学号姓名-口播视频.mp4");
    try {
      execFileSync(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", "voice_segs/list.txt", "-c", "copy", finalOut], { cwd: ROOT, stdio: "pipe" });
      const st = (await import("fs")).statSync(finalOut);
      console.log("\n=== 合成完成 ===");
      console.log("输出:", finalOut);
      console.log("大小:", (st.size / 1024 / 1024).toFixed(2), "MB");
    } catch (e) {
      console.log("拼接失败:", e.message);
    }
  }
})();
