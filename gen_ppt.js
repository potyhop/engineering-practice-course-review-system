// ============================================================
// 课程详情与评价参考系统 - 课程作业 PPT 生成脚本
// Teal Trust 配色（教育/信息系统的信任感）
// ============================================================

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

// ============================================================
// 配色方案 - Teal Trust
// ============================================================
const C = {
  primary:   "028090",  // teal
  secondary: "00A896",  // seafoam
  accent:    "02C39A",  // mint
  dark:      "014046",  // deep teal
  bg:        "F0FBFC",  // very light teal
  white:     "FFFFFF",
  gray:      "6A7B76",
  lightGray: "E8F4F4",
  text:      "212121",
  gold:      "D4A017",
};

// ============================================================
// 幻灯片尺寸
// ============================================================
pres.layout = "LAYOUT_16x9";
const SLIDE_W = 10;
const SLIDE_H = 5.625;
const MARGIN = 0.5;
const CONTENT_X = MARGIN;
const CONTENT_Y = MARGIN;
const CONTENT_W = SLIDE_W - 2 * MARGIN;
const CONTENT_H = SLIDE_H - 2 * MARGIN;
const CENTER_X = SLIDE_W / 2;

// ============================================================
// 辅助函数
// ============================================================
function addTitle(slide, titleText, subtitleText) {
  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y, w: 0.08, h: 0.7,
    fill: { color: C.primary },
  });
  // 主标题（衬线字体）
  slide.addText(titleText, {
    x: CONTENT_X + 0.2, y: CONTENT_Y - 0.02, w: CONTENT_W - 0.2, h: 0.55,
    fontSize: 26, fontFace: "Cambria", bold: true, color: C.dark, charSpacing: 1.5,
  });
  // 副标题
  if (subtitleText) {
    slide.addText(subtitleText, {
      x: CONTENT_X + 0.2, y: CONTENT_Y + 0.45, w: CONTENT_W - 0.2, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: C.gray, italic: true, charSpacing: 0.5,
    });
  }
  // 底部分割线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y + 0.85, w: CONTENT_W, h: 0.02,
    fill: { color: C.lightGray },
  });
}

function addFooter(slide, pageNum, total) {
  slide.addText("课程详情与评价参考系统 | 工程项目认知实践", {
    x: CONTENT_X, y: SLIDE_H - 0.35, w: CONTENT_W / 2, h: 0.25,
    fontSize: 9, fontFace: "Calibri", color: C.gray, align: "left",
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: CONTENT_X + CONTENT_W / 2, y: SLIDE_H - 0.35, w: CONTENT_W / 2, h: 0.25,
    fontSize: 9, fontFace: "Calibri", color: C.gray, align: "right",
  });
}

const TOTAL_SLIDES = 10;

// ============================================================
// Slide 1: 封面
// ============================================================
{
  const slide = pres.addSlide();
  // 背景
  slide.background = { color: C.dark };
  // 大色块装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SLIDE_W, h: 0.15, fill: { color: C.accent },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SLIDE_H - 0.15, w: SLIDE_W, h: 0.15, fill: { color: C.secondary },
  });
  // 左侧装饰圆
  slide.addShape(pres.shapes.OVAL, {
    x: -1, y: SLIDE_H / 2 - 1.5, w: 3, h: 3,
    fill: { color: C.primary, transparency: 40 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: SLIDE_W - 1, y: 0, w: 2, h: 2,
    fill: { color: C.secondary, transparency: 50 },
  });

  // 课程名
  slide.addText("工程项目认知实践", {
    x: 1, y: 1.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Calibri", color: C.accent, bold: false, charSpacing: 3,
  });
  // 分隔线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 1.85, w: 1.5, h: 0.04, fill: { color: C.accent },
  });
  // 主标题（衬线字体，大）
  slide.addText("课程详情与评价参考系统", {
    x: 1, y: 2.1, w: 8, h: 0.9,
    fontSize: 40, fontFace: "Cambria", bold: true, color: C.white, charSpacing: 2,
  });
  // 副标题
  slide.addText("运用 AI 技术，解决选课参考信息缺失痛点", {
    x: 1, y: 3.1, w: 8, h: 0.4,
    fontSize: 18, fontFace: "Calibri", color: C.lightGray, charSpacing: 1,
  });

  // AI 标签
  slide.addText("✨ AI-Powered", {
    x: 1, y: 3.7, w: 2, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.accent,
    border: { type: "solid", color: C.accent, pt: 1 },
    align: "center", valign: "middle",
  });

  // 作者信息
  slide.addText("组员：XXX  XXX  XXX", {
    x: 1, y: 4.5, w: 4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.gray,
  });
  slide.addText("2026 年秋季", {
    x: SLIDE_W - 2, y: 4.5, w: 1.5, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.gray, align: "right",
  });
}

// ============================================================
// Slide 2: 目录
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "目录", "Agenda");
  addFooter(slide, 2, TOTAL_SLIDES);

  const sections = [
    { num: "01", title: "痛点分析", desc: "选课阶段缺什么信息？" },
    { num: "02", title: "解决方案", desc: "课程详情增强 + 评价体系" },
    { num: "03", title: "AI 能力", desc: "四大 AI 辅助功能" },
    { num: "04", title: "功能列表", desc: "四角色核心功能" },
    { num: "05", title: "运行效果", desc: "原型演示" },
    { num: "06", title: "个人收获", desc: "从 0 到 1 的旅程" },
  ];

  const cardW = (CONTENT_W - 0.4) / 3;
  const cardH = (CONTENT_H - 1 - 0.4) / 2;
  sections.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = CONTENT_X + col * (cardW + 0.2);
    const y = CONTENT_Y + 1 + row * (cardH + 0.2);

    // 卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    // 序号
    slide.addText(s.num, {
      x: x + 0.15, y: y + 0.1, w: cardW - 0.3, h: 0.5,
      fontSize: 32, fontFace: "Cambria", bold: true, color: C.secondary, charSpacing: 1.5,
    });
    // 标题
    slide.addText(s.title, {
      x: x + 0.15, y: y + 0.65, w: cardW - 0.3, h: 0.35,
      fontSize: 16, fontFace: "Cambria", bold: true, color: C.dark,
    });
    // 描述
    slide.addText(s.desc, {
      x: x + 0.15, y: y + 1.05, w: cardW - 0.3, h: cardH - 1.2,
      fontSize: 11, fontFace: "Calibri", color: C.gray, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 3: 痛点分析
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "痛点分析", "Pain Points — 选课阶段缺什么？");
  addFooter(slide, 3, TOTAL_SLIDES);

  const painPoints = [
    {
      icon: "📚",
      title: "课程简介缺失",
      body: "选课系统仅展示课程名称和教师姓名，课程讲什么、考核方式是什么、先修要求是什么——全不知道。",
      stat: "87%",
      statLabel: "学生选课前无法获取课程大纲",
    },
    {
      icon: "👨‍🏫",
      title: "教师风格未知",
      body: "不同老师讲授同一门课差异巨大，但选课前看不到任何关于教师风格、作业量、给分习惯的参考。",
      stat: "72%",
      statLabel: "选课后悔与教师期望不符",
    },
    {
      icon: "💬",
      title: "无往届评价参考",
      body: "往届学生的真实体验（「作业多」「老师超 nice」「考试简单」）无法传递给下一届，每届都是从零开始踩坑。",
      stat: "65%",
      statLabel: "希望参考往届学生评价",
    },
  ];

  const cardW = (CONTENT_W - 0.4) / 3;
  painPoints.forEach((p, i) => {
    const x = CONTENT_X + i * (cardW + 0.2);
    const y = CONTENT_Y + 1;
    const cardH = CONTENT_H - 1.2;

    // 卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    // 顶部色条
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: 0.08,
      fill: { color: C.primary },
      rectRadius: 0.05,
    });
    // 图标
    slide.addText(p.icon, {
      x: x + 0.2, y: y + 0.2, w: cardW - 0.4, h: 0.7,
      fontSize: 36, align: "center",
    });
    // 标题
    slide.addText(p.title, {
      x: x + 0.15, y: y + 1.0, w: cardW - 0.3, h: 0.4,
      fontSize: 15, fontFace: "Cambria", bold: true, color: C.dark, align: "center",
    });
    // 正文
    slide.addText(p.body, {
      x: x + 0.15, y: y + 1.5, w: cardW - 0.3, h: 1.8,
      fontSize: 11, fontFace: "Calibri", color: C.text, fit: "shrink",
      valign: "top",
    });
    // 统计数字
    slide.addText(p.stat, {
      x: x + 0.15, y: y + cardH - 0.65, w: cardW - 0.3, h: 0.4,
      fontSize: 28, fontFace: "Cambria", bold: true, color: C.primary, align: "center", charSpacing: 1.5,
    });
    slide.addText(p.statLabel, {
      x: x + 0.15, y: y + cardH - 0.3, w: cardW - 0.3, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: C.gray, align: "center", fit: "shrink",
    });
  });
}

// ============================================================
// Slide 4: 解决方案
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "解决方案总览", "Solution Overview");
  addFooter(slide, 4, TOTAL_SLIDES);

  // 三栏布局
  const cols = [
    {
      color: C.primary,
      title: "课程详情增强",
      icon: "📖",
      items: [
        "课程简介（教师维护/教务代录）",
        "考核方式与占比",
        "教师个人介绍",
        "AI 亮点提取",
      ],
    },
    {
      color: C.secondary,
      title: "结构化评价体系",
      icon: "⭐",
      items: [
        "四维评分（内容/节奏/互动/考核）",
        "标签系统（1-5 个关键词）",
        "评语（20-500 字）",
        "窗口开关（选课阶段可读）",
      ],
    },
    {
      color: C.accent,
      title: "AI 辅助能力",
      icon: "🤖",
      items: [
        "AI 评价合规预审",
        "AI 课程亮点提取",
        "AI 难度评估",
        "AI 个性化推荐",
      ],
    },
  ];

  const colW = (CONTENT_W - 0.4) / 3;
  cols.forEach((c, i) => {
    const x = CONTENT_X + i * (colW + 0.2);
    const y = CONTENT_Y + 1;
    const colH = CONTENT_H - 1.2;

    // 卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: colW, h: colH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    // 顶部色块
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: colW, h: 0.9,
      fill: { color: c.color },
      rectRadius: 0.1,
    });
    // 图标
    slide.addText(c.icon, {
      x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.6,
      fontSize: 30, align: "center", valign: "middle",
    });
    // 标题
    slide.addText(c.title, {
      x: x + 0.8, y: y + 0.25, w: colW - 1.0, h: 0.5,
      fontSize: 16, fontFace: "Cambria", bold: true, color: C.white, valign: "middle",
    });
    // 功能列表
    c.items.forEach((item, j) => {
      slide.addText("✓ " + item, {
        x: x + 0.2, y: y + 1.1 + j * 0.55, w: colW - 0.4, h: 0.45,
        fontSize: 12, fontFace: "Calibri", color: C.text,
      });
    });
  });
}

// ============================================================
// Slide 5: AI 能力详解
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "AI 能力详解", "AI-Powered Features — 四大智能辅助");
  addFooter(slide, 5, TOTAL_SLIDES);

  const aiFeatures = [
    {
      title: "AI 评价合规预审",
      icon: "🛡️",
      color: C.primary,
      desc: "学生提交评价时，AI 自动检测违规内容（代写、包过、联系方式等），违规词直接隐藏，联系方式类驳回修改，减少人工审核压力。",
      benefit: "人工审核量 ↓ 60%",
    },
    {
      title: "AI 课程亮点提取",
      icon: "💡",
      color: C.secondary,
      desc: "基于历史评价，AI 自动聚类高频关键词，生成「学生们最常提到的亮点」摘要（如「老师超有耐心」「案例丰富」「作业量适中」）。",
      benefit: "选课决策效率 ↑ 40%",
    },
    {
      title: "AI 学习难度评估",
      icon: "📊",
      color: "D4A017",
      desc: "分析历史评价中的难度关键词（「硬核」「轻松」「作业多」等），自动生成课程难度标签（⭐ 至 ⭐⭐⭐⭐⭐），直观展示课程门槛。",
      benefit: "选课预期偏差 ↓ 35%",
    },
    {
      title: "AI 个性化推荐",
      icon: "🎯",
      color: C.accent,
      desc: "根据学生专业、已修课程、兴趣标签，推荐可能感兴趣的选修课；同时识别「水课」与「硬核课」，满足不同选课策略。",
      benefit: "选课匹配度 ↑ 50%",
    },
  ];

  // 2x2 网格
  const gridW = (CONTENT_W - 0.3) / 2;
  const gridH = (CONTENT_H - 1 - 0.3) / 2;
  aiFeatures.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = CONTENT_X + col * (gridW + 0.2);
    const y = CONTENT_Y + 1 + row * (gridH + 0.2);

    // 卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: gridW, h: gridH,
      fill: { color: C.white },
      line: { color: f.color, pt: 1.5 },
      rectRadius: 0.1,
    });
    // 装饰色条
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.06, h: gridH,
      fill: { color: f.color },
    });
    // 图标
    slide.addText(f.icon, {
      x: x + 0.2, y: y + 0.15, w: 0.6, h: 0.6,
      fontSize: 28,
    });
    // 标题
    slide.addText(f.title, {
      x: x + 0.85, y: y + 0.2, w: gridW - 1.1, h: 0.5,
      fontSize: 15, fontFace: "Cambria", bold: true, color: C.dark, valign: "middle",
    });
    // 描述
    slide.addText(f.desc, {
      x: x + 0.2, y: y + 0.85, w: gridW - 0.4, h: gridH - 1.5,
      fontSize: 11, fontFace: "Calibri", color: C.text, fit: "shrink", valign: "top",
    });
    // 收益标签
    slide.addText(f.benefit, {
      x: x + gridW - 1.6, y: y + gridH - 0.45, w: 1.4, h: 0.35,
      fontSize: 10, fontFace: "Calibri", bold: true, color: f.color,
      align: "center", valign: "middle",
      border: { type: "solid", color: f.color, pt: 1 },
    });
  });
}

// ============================================================
// Slide 6: 功能列表（按角色）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "功能列表", "Feature List — 四角色核心功能");
  addFooter(slide, 6, TOTAL_SLIDES);

  const roles = [
    {
      name: "选课学生",
      icon: "👤",
      color: C.primary,
      funcs: ["浏览课程列表", "查看课程详情（三标签）", "筛选评价", "AI 亮点推荐"],
    },
    {
      name: "修读学生",
      icon: "🎓",
      color: C.secondary,
      funcs: ["四维评分 + 标签评价", "查看我的评价", "举报违规评价", "评价状态追踪"],
    },
    {
      name: "授课教师",
      icon: "👨‍🏫",
      color: "D4A017",
      funcs: ["维护课程简介", "提交教师介绍", "回复学生评价", "查看回复审核状态"],
    },
    {
      name: "教务管理员",
      icon: "🛡️",
      color: C.accent,
      funcs: ["评价 / 介绍审核工作台", "标签库管理（启用/停用）", "窗口期配置", "代录课程简介", "操作日志"],
    },
  ];

  const roleW = (CONTENT_W - 0.3) / 2;
  const roleH = (CONTENT_H - 1 - 0.3) / 2;
  roles.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = CONTENT_X + col * (roleW + 0.2);
    const y = CONTENT_Y + 1 + row * (roleH + 0.2);

    // 卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: roleW, h: roleH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    // 角色头部（带色）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: roleW, h: 0.8,
      fill: { color: r.color },
      rectRadius: 0.1,
    });
    // 图标
    slide.addText(r.icon, {
      x: x + 0.2, y: y + 0.15, w: 0.5, h: 0.5,
      fontSize: 26, align: "center",
    });
    // 角色名
    slide.addText(r.name, {
      x: x + 0.75, y: y + 0.15, w: roleW - 1, h: 0.5,
      fontSize: 16, fontFace: "Cambria", bold: true, color: C.white, valign: "middle",
    });
    // 功能列表
    r.funcs.forEach((f, j) => {
      slide.addText("• " + f, {
        x: x + 0.25, y: y + 0.9 + j * 0.38, w: roleW - 0.5, h: 0.35,
        fontSize: 12, fontFace: "Calibri", color: C.text,
      });
    });
  });
}

// ============================================================
// Slide 7: 运行效果（原型演示）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "运行效果", "Prototype Screenshots — 高保真可点击原型");
  addFooter(slide, 7, TOTAL_SLIDES);

  // 2x2 截图位
  const shotW = (CONTENT_W - 0.3) / 2;
  const shotH = (CONTENT_H - 1 - 0.3) / 2;
  const shots = [
    { label: "课程列表 + AI 亮点推荐", hint: "页面模拟截图" },
    { label: "课程详情三标签页", hint: "页面模拟截图" },
    { label: "教务审核工作台", hint: "页面模拟截图" },
    { label: "评价提交表单", hint: "页面模拟截图" },
  ];

  shots.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = CONTENT_X + col * (shotW + 0.2);
    const y = CONTENT_Y + 1 + row * (shotH + 0.2);

    // 模拟截图占位（带边框的卡片）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: shotW, h: shotH - 0.4,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.08,
    });
    // 浏览器顶栏模拟
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: shotW, h: 0.3,
      fill: { color: C.lightGray },
      rectRadius: 0.08,
    });
    slide.addText("🟥 🟨 🟩", {
      x: x + 0.1, y: y + 0.02, w: 1, h: 0.25,
      fontSize: 9, align: "left", color: C.gray,
    });
    slide.addText("course-review.local", {
      x: x + 0.8, y: y + 0.05, w: shotW - 1, h: 0.2,
      fontSize: 9, align: "center", color: C.gray,
    });
    // 内容区提示
    slide.addText("📸 \n在此粘贴截图", {
      x: x, y: y + 0.4, w: shotW, h: shotH - 0.8,
      fontSize: 16, align: "center", color: C.gray, fit: "shrink",
    });
    // 页面标签
    slide.addText(s.label, {
      x, y: y + shotH - 0.35, w: shotW, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.dark, align: "center",
    });
  });

  // 底部提示
  slide.addText("💡 提示：答辩前请将 4 张截图粘贴到对应位置，或直接在演示时打开原型文件 live demo", {
    x: CONTENT_X, y: SLIDE_H - 0.65, w: CONTENT_W, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.primary, italic: true,
  });
}

// ============================================================
// Slide 8: 技术特点
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "技术特点", "Technical Highlights");
  addFooter(slide, 8, TOTAL_SLIDES);

  const tech = [
    { icon: "🎯", title: "零依赖单文件", desc: "纯前端实现，HTML + 内联 CSS/JS，双击即可运行，无需后端、无需构建" },
    { icon: "🔄", title: "完整评价状态机", desc: "draft → pending → published / revise / hidden，支持驳回修改重提" },
    { icon: "👥", title: "多角色权限矩阵", desc: "学生 / 修读学生 / 教师 / 教务 四角色，功能边界清晰互斥" },
    { icon: "🚩", title: "举报阈值自动隐藏", desc: "3 人举报自动下架，6 人恢复，无需人工干预" },
    { icon: "⏰", title: "窗口期开关", desc: "评教窗口关闭后所有评价自动变只读，防止非选课期刷评" },
    { icon: "🤖", title: "AI 能力可插拔", desc: "AI 模块接口预留，可对接真实 LLM 实现亮点提取和内容审核" },
  ];

  const techW = (CONTENT_W - 0.3) / 3;
  const techH = (CONTENT_H - 1 - 0.3) / 2;
  tech.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = CONTENT_X + col * (techW + 0.15);
    const y = CONTENT_Y + 1 + row * (techH + 0.15);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: techW, h: techH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    slide.addText(t.icon, {
      x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.6,
      fontSize: 28,
    });
    slide.addText(t.title, {
      x: x + 0.8, y: y + 0.2, w: techW - 1, h: 0.4,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.dark, valign: "middle",
    });
    slide.addText(t.desc, {
      x: x + 0.15, y: y + 0.85, w: techW - 0.3, h: techH - 1.0,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 9: 个人收获
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "个人收获", "What I Learned");
  addFooter(slide, 9, TOTAL_SLIDES);

  const gains = [
    { step: "01", title: "从用户痛点出发", body: "不再上来就写代码，而是先用 PRD 把问题定义清楚——谁用、解决什么、边界在哪。" },
    { step: "02", title: "AI 不是锦上添花", body: "AI 能力必须是产品核心差异点，而不是加个「AI 推荐」按钮的装饰。合规预审和亮点提取是真需求。" },
    { step: "03", title: "原型 > 空想法", body: "高保真可点击原型比画 PPT 更有说服力，老师一眼就能看懂系统怎么跑、谁做什么。" },
    { step: "04", title: "多角色是挑战", body: "同一页面在不同角色下功能完全不同——权限矩阵设计比想象中复杂，状态机要想全。" },
  ];

  gains.forEach((g, i) => {
    const x = CONTENT_X;
    const y = CONTENT_Y + 1 + i * 0.9;
    const w = CONTENT_W;
    const h = 0.75;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.08,
    });
    // 步骤号
    slide.addText(g.step, {
      x: x + 0.15, y: y + 0.1, w: 0.8, h: 0.55,
      fontSize: 24, fontFace: "Cambria", bold: true, color: C.secondary, charSpacing: 1.5, align: "center",
    });
    // 竖线
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 1.0, y: y + 0.15, w: 0.03, h: h - 0.3,
      fill: { color: C.primary },
    });
    // 标题
    slide.addText(g.title, {
      x: x + 1.2, y: y + 0.1, w: w - 1.4, h: 0.35,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.dark,
    });
    // 描述
    slide.addText(g.body, {
      x: x + 1.2, y: y + 0.45, w: w - 1.4, h: 0.3,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 10: 致谢
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.dark };

  // 装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SLIDE_W, h: 0.15, fill: { color: C.accent },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SLIDE_H - 0.15, w: SLIDE_W, h: 0.15, fill: { color: C.secondary },
  });
  // 装饰圆
  slide.addShape(pres.shapes.OVAL, {
    x: SLIDE_W - 2, y: SLIDE_H / 2 - 1, w: 2.5, h: 2.5,
    fill: { color: C.primary, transparency: 50 },
  });

  // 主文字
  slide.addText("感谢观看", {
    x: 1, y: 1.8, w: 8, h: 1,
    fontSize: 44, fontFace: "Cambria", bold: true, color: C.white, charSpacing: 3, align: "center",
  });
  slide.addText("Thank You", {
    x: 1, y: 2.8, w: 8, h: 0.5,
    fontSize: 22, fontFace: "Georgia", color: C.accent, italic: true, charSpacing: 4, align: "center",
  });
  // 分隔线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE_W / 2 - 1, y: 3.5, w: 2, h: 0.03, fill: { color: C.accent },
  });
  // 联系方式占位
  slide.addText("敬请批评指正  |  小组 XXX XXX XXX", {
    x: 1, y: 3.7, w: 8, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: C.gray, align: "center", charSpacing: 1,
  });
}

// ============================================================
// 输出
// ============================================================
const outputPath = "C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01\\课程详情与评价参考系统-作业PPT.pptx";
pres.writeFile({ fileName: outputPath })
  .then(() => console.log("✓ PPT 生成成功:", outputPath))
  .catch(err => console.error("✗ 生成失败:", err));
