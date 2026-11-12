// ============================================================
// 课程详情与评价参考系统 - 技能复现实操 PPT（Workshop 风格）
// 教别人如何从零搭建这个单文件 AI 应用
// Teal Trust 配色（与作业 PPT 统一）
// ============================================================

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

const C = {
  primary:   "028090",
  secondary: "00A896",
  accent:    "02C39A",
  dark:      "014046",
  bg:        "F0FBFC",
  white:     "FFFFFF",
  gray:      "6A7B76",
  lightGray: "E8F4F4",
  text:      "212121",
  gold:      "D4A017",
  codeBg:    "014046",
  codeText:  "02C39A",
};

pres.layout = "LAYOUT_16x9";
const SLIDE_W = 10;
const SLIDE_H = 5.625;
const MARGIN = 0.5;
const CONTENT_X = MARGIN;
const CONTENT_Y = MARGIN;
const CONTENT_W = SLIDE_W - 2 * MARGIN;
const CONTENT_H = SLIDE_H - 2 * MARGIN;

function addTitle(slide, titleText, subtitleText) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y, w: 0.08, h: 0.7,
    fill: { color: C.primary },
  });
  slide.addText(titleText, {
    x: CONTENT_X + 0.2, y: CONTENT_Y - 0.02, w: CONTENT_W - 0.2, h: 0.55,
    fontSize: 26, fontFace: "Cambria", bold: true, color: C.dark, charSpacing: 1.5,
  });
  if (subtitleText) {
    slide.addText(subtitleText, {
      x: CONTENT_X + 0.2, y: CONTENT_Y + 0.45, w: CONTENT_W - 0.2, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: C.gray, italic: true, charSpacing: 0.5,
    });
  }
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y + 0.85, w: CONTENT_W, h: 0.02,
    fill: { color: C.lightGray },
  });
}

function addFooter(slide, pageNum, total) {
  slide.addText("从零搭建 · 单文件 AI 应用复现实操", {
    x: CONTENT_X, y: SLIDE_H - 0.35, w: CONTENT_W / 2, h: 0.25,
    fontSize: 9, fontFace: "Calibri", color: C.gray, align: "left",
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: CONTENT_X + CONTENT_W / 2, y: SLIDE_H - 0.35, w: CONTENT_W / 2, h: 0.25,
    fontSize: 9, fontFace: "Calibri", color: C.gray, align: "right",
  });
}

const TOTAL_SLIDES = 12;

// ============================================================
// Slide 1: 封面
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.dark };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.15, fill: { color: C.accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: SLIDE_H - 0.15, w: SLIDE_W, h: 0.15, fill: { color: C.secondary } });
  slide.addShape(pres.shapes.OVAL, { x: -1, y: SLIDE_H / 2 - 1.5, w: 3, h: 3, fill: { color: C.primary, transparency: 40 } });

  slide.addText("技能复现实操", {
    x: 1, y: 1.0, w: 8, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.accent, bold: false, charSpacing: 3,
  });
  slide.addText("从零搭建", {
    x: 1, y: 1.6, w: 8, h: 0.8,
    fontSize: 38, fontFace: "Cambria", bold: true, color: C.white, charSpacing: 2,
  });
  slide.addText("单文件 AI 应用", {
    x: 1, y: 2.4, w: 8, h: 0.7,
    fontSize: 30, fontFace: "Cambria", bold: true, color: C.accent, charSpacing: 2,
  });
  slide.addText("HTML + 内联 CSS/JS · 零依赖 · 双击运行", {
    x: 1, y: 3.2, w: 8, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: C.lightGray, charSpacing: 1,
  });
  slide.addText("🛠️  Workshop 风格 · 手把手复现", {
    x: 1, y: 4.0, w: 4, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.accent,
    border: { type: "solid", color: C.accent, pt: 1 }, align: "center", valign: "middle",
  });
}

// ============================================================
// Slide 2: 你将学到什么
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "你将学到什么", "What You'll Learn");
  addFooter(slide, 2, TOTAL_SLIDES);

  const skills = [
    { icon: "🏗️", title: "架构设计", desc: "如何用纯前端单文件承载多角色复杂业务" },
    { icon: "🔄", title: "状态机实现", desc: "评价的 draft→pending→published 流转怎么写" },
    { icon: "👥", title: "权限矩阵", desc: "四种角色功能边界如何在前端互斥" },
    { icon: "🤖", title: "AI 能力模拟", desc: "不用后端也能做 AI 合规预审和亮点提取" },
    { icon: "📐", title: "布局模式", desc: "全局 data-act 动作分发 + 虚拟 DOM 容器" },
    { icon: "⚡", title: "零依赖部署", desc: "为什么单文件比后端+构建栈更有教学价值" },
  ];

  const skW = (CONTENT_W - 0.3) / 3;
  const skH = (CONTENT_H - 1 - 0.3) / 2;
  skills.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = CONTENT_X + col * (skW + 0.15);
    const y = CONTENT_Y + 1 + row * (skH + 0.15);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: skW, h: skH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    slide.addText(s.icon, {
      x: x + 0.15, y: y + 0.2, w: 0.7, h: 0.7,
      fontSize: 30, align: "center",
    });
    slide.addText(s.title, {
      x: x + 0.95, y: y + 0.25, w: skW - 1.15, h: 0.45,
      fontSize: 15, fontFace: "Cambria", bold: true, color: C.dark, valign: "middle",
    });
    slide.addText(s.desc, {
      x: x + 0.15, y: y + 1.0, w: skW - 0.3, h: skH - 1.2,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 3: 技术选型 — 为什么单文件零依赖
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "技术选型决策", "Why Single-File Zero-Dependency");
  addFooter(slide, 3, TOTAL_SLIDES);

  // 对比表
  const rows = [
    ["维度", "传统方案（后端 + 前端框架）", "本项目方案（单文件原型）"],
    ["运行条件", "Node + 数据库 + 构建工具", "任 意浏览器，双击即可"],
    ["部署复杂度", "高（环境/依赖/构建/部署）", "零（拷贝 HTML 文件）"],
    ["演示可靠性", "依赖网络/后端，易挂", "100% 离线可用"],
    ["教学价值", "学生被环境问题卡壳", "聚焦业务逻辑本身"],
    ["可拓展性", "★★★★★", "★★★☆☆"],
    ["适合场景", "生产系统", "原型/教学/课程作业"],
  ];

  const colW = [1.8, 3.6, 3.6];
  const startX = CONTENT_X;
  const startY = CONTENT_Y + 1;
  const rowH = 0.58;

  rows.forEach((row, ri) => {
    const y = startY + ri * rowH;
    row.forEach((cell, ci) => {
      const x = startX + colW.slice(0, ci).reduce((a, b) => a + b, 0);
      const w = colW[ci];

      if (ri === 0) {
        // 表头
        slide.addShape(pres.shapes.RECTANGLE, {
          x, y, w, h: rowH,
          fill: { color: C.primary },
        });
        slide.addText(cell, {
          x: x + 0.1, y, w: w - 0.2, h: rowH,
          fontSize: 12, fontFace: "Calibri", bold: true, color: C.white, valign: "middle",
        });
      } else {
        // 数据行
        const bgColor = ri % 2 === 0 ? C.white : C.lightGray;
        slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: rowH, fill: { color: bgColor } });
        slide.addText(cell, {
          x: x + 0.1, y: y + 0.05, w: w - 0.2, h: rowH - 0.1,
          fontSize: 11, fontFace: "Calibri", color: C.text, valign: "middle",
        });
      }
    });
  });

  // 底部结论
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: SLIDE_H - 1.1, w: CONTENT_W, h: 0.6,
    fill: { color: C.accent, transparency: 80 },
    line: { color: C.accent, pt: 1 },
    rectRadius: 0.1,
  });
  slide.addText("🎯 决策依据：作业核心是「业务逻辑 + AI 设计 + 演示」，单文件方案让我们把精力放在真正重要的东西上", {
    x: CONTENT_X + 0.2, y: SLIDE_H - 1.0, w: CONTENT_W - 0.4, h: 0.4,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.dark, valign: "middle",
  });
}

// ============================================================
// Slide 4: 核心架构
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "核心架构", "Architecture Overview");
  addFooter(slide, 4, TOTAL_SLIDES);

  // 三层架构图
  const layers = [
    { y: CONTENT_Y + 1.1, h: 0.8, color: C.primary, name: "视图层 — 角色页面切换", items: "列表 / 详情 / 表单 / 审核工作台" },
    { y: CONTENT_Y + 2.1, h: 0.8, color: C.secondary, name: "逻辑层 — 核心引擎", items: "render() 分发 + handleAction() 动作 + queues() 聚合" },
    { y: CONTENT_Y + 3.1, h: 1.0, color: "028090", name: "数据层 — 模拟数据", items: "DATA.courses / DATA.reviews / DATA.cfg 状态机 + AI 预审规则 + 配置" },
  ];

  layers.forEach(l => {
    // 左侧色条
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: CONTENT_X, y: l.y, w: 0.12, h: l.h,
      fill: { color: l.color },
      rectRadius: 0.05,
    });
    // 层级背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: CONTENT_X + 0.2, y: l.y, w: CONTENT_W - 0.2, h: l.h,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.08,
    });
    // 层级名
    slide.addText(l.name, {
      x: CONTENT_X + 0.4, y: l.y + 0.05, w: 3, h: 0.35,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.dark,
    });
    // 功能列表
    slide.addText(l.items, {
      x: CONTENT_X + 0.4, y: l.y + 0.45, w: CONTENT_W - 0.6, h: l.h - 0.5,
      fontSize: 10.5, fontFace: "Calibri", color: C.gray,
    });
  });

  // 右侧数据流箭头
  const arrows = ["↕ 事件触发", "↕ 状态变更", "↕ 渲染刷新"];
  arrows.forEach((a, i) => {
    slide.addText(a, {
      x: CONTENT_X + CONTENT_W - 0.8, y: CONTENT_Y + 1.15 + i * 1.0, w: 0.7, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: C.secondary, align: "center",
    });
  });

  // 底部架构说明
  slide.addText("设计原则：全局 DATA 对象做单一数据源 → 所有修改走 DATA 函数 → render() 统一刷新 DOM", {
    x: CONTENT_X, y: SLIDE_H - 0.4, w: CONTENT_W, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.gray, italic: true,
  });
}

// ============================================================
// Slide 5: 评价状态机
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "关键实现 1：评价状态机", "Review Lifecycle State Machine");
  addFooter(slide, 5, TOTAL_SLIDES);

  // 状态节点
  const states = [
    { x: 0.8, y: 2.8, name: "draft", label: "草稿", color: C.lightGray, textColor: C.gray },
    { x: 2.8, y: 2.8, name: "pending", label: "待审", color: C.gold, textColor: C.white },
    { x: 4.8, y: 1.5, name: "published", label: "已发布", color: C.secondary, textColor: C.white },
    { x: 4.8, y: 4.0, name: "revise", label: "需修改", color: C.primary, textColor: C.white },
    { x: 7.2, y: 2.8, name: "hidden", label: "已隐藏", color: C.dark, textColor: C.white },
  ];

  // 连线
  const arrows = [
    { from: 0, to: 1, label: "提交" },
    { from: 1, to: 2, label: "审核通过" },
    { from: 1, to: 3, label: "驳回（联系方式）" },
    { from: 1, to: 4, label: "违规词→直接隐藏" },
    { from: 3, to: 0, label: "修改后重提" },
    { from: 4, to: 2, label: "6 人举报→恢复" },
  ];

  // 画连线
  arrows.forEach(a => {
    const from = states[a.from];
    const to = states[a.to];
    slide.addShape(pres.shapes.LINE, {
      x: from.x + 1.2, y: from.y + 0.4,
      w: to.x - from.x - 1.2, h: to.y - from.y,
      line: { color: C.gray, pt: 1.25, endArrowType: "triangle" },
    });
    const midX = (from.x + to.x + 1.2) / 2;
    const midY = (from.y + to.y + 0.4) / 2;
    slide.addText(a.label, {
      x: midX - 0.6, y: midY - 0.2, w: 1.2, h: 0.3,
      fontSize: 8, fontFace: "Calibri", color: C.gray, align: "center",
      fill: { color: C.bg },
    });
  });

  // 画状态圆
  states.forEach(s => {
    slide.addShape(pres.shapes.OVAL, {
      x: s.x, y: s.y, w: 1.2, h: 0.8,
      fill: { color: s.color },
    });
    slide.addText(s.name, {
      x: s.x, y: s.y + 0.05, w: 1.2, h: 0.35,
      fontSize: 9, fontFace: "Calibri", bold: true, color: s.textColor, align: "center", valign: "middle",
    });
    slide.addText(s.label, {
      x: s.x, y: s.y + 0.4, w: 1.2, h: 0.35,
      fontSize: 10, fontFace: "Calibri", color: C.text, align: "center", valign: "middle", bold: true,
    });
  });

  // 审核分流规则
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: SLIDE_H - 1.1, w: CONTENT_W, h: 0.8,
    fill: { color: C.white },
    line: { color: C.lightGray, pt: 1 },
    rectRadius: 0.08,
  });
  slide.addText("📋 审核分流规则（学生提交后）", {
    x: CONTENT_X + 0.2, y: SLIDE_H - 1.05, w: 3, h: 0.3,
    fontSize: 11, fontFace: "Cambria", bold: true, color: C.dark,
  });
  slide.addText("违规词（代写/包过/加微信）→ hidden | 联系方式/微信号 → revise | 其余 → pending 人工队列", {
    x: CONTENT_X + 0.2, y: SLIDE_H - 0.75, w: CONTENT_W - 0.4, h: 0.35,
    fontSize: 10, fontFace: "Calibri", color: C.text, fit: "shrink",
  });
}

// ============================================================
// Slide 6: 关键实现 2 — 多角色权限矩阵
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "关键实现 2：多角色权限矩阵", "Role-Based Permission Matrix");
  addFooter(slide, 6, TOTAL_SLIDES);

  const roles = ["选课学生", "修读学生", "授课教师", "教务"];
  const perms = [
    ["浏览课程列表",    "✓", "✓", "✓", "✓"],
    ["查看课程评价",    "✓", "✓", "✓", "✓"],
    ["提交评价",        "✗", "✓", "✗", "✗"],
    ["举报违规评价",    "✗", "✓", "✗", "✗"],
    ["维护课程简介",    "✗", "✗", "✓(审核后发布)", "✓(代录直发)"],
    ["回复学生评价",    "✗", "✗", "✓(审核后显示)", "✗"],
    ["审核评价/介绍",   "✗", "✗", "✗", "✓"],
    ["配置窗口期/标签", "✗", "✗", "✗", "✓"],
    ["查看操作日志",    "✗", "✗", "✗", "✓"],
  ];

  const colW = [2.8, 1.5, 1.5, 1.5, 1.5];
  const startX = CONTENT_X;
  const startY = CONTENT_Y + 1;
  const rowH = 0.42;

  // 表头
  roles.forEach((r, i) => {
    const x = startX + colW.slice(0, i).reduce((a, b) => a + b, 0) + (i === 0 ? 0 : 0);
    const w = colW[i + 1];
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w, h: rowH,
      fill: { color: C.primary },
    });
    slide.addText(r, {
      x: x + 0.05, y: startY, w: w - 0.1, h: rowH,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle",
    });
  });
  // 第一列表头
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: startY, w: colW[0], h: rowH,
    fill: { color: C.dark },
  });
  slide.addText("功能 / 角色", {
    x: startX + 0.1, y: startY, w: colW[0] - 0.2, h: rowH,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.white, valign: "middle",
  });

  // 数据行
  perms.forEach((row, ri) => {
    const y = startY + (ri + 1) * rowH;
    row.forEach((cell, ci) => {
      const x = startX + colW.slice(0, ci).reduce((a, b) => a + b, 0);
      const w = colW[ci];
      const bgColor = ri % 2 === 0 ? C.white : C.lightGray;
      slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: rowH, fill: { color: bgColor } });

      const textColor = ci === 0 ? C.text :
        cell.startsWith("✓") ? C.secondary :
        cell.startsWith("✗") ? C.gray : C.primary;

      slide.addText(cell, {
        x: x + 0.08, y, w: w - 0.16, h: rowH,
        fontSize: ci === 0 ? 10.5 : 10, fontFace: "Calibri", color: textColor,
        align: ci === 0 ? "left" : "center", valign: "middle", fit: "shrink",
      });
    });
  });
}

// ============================================================
// Slide 7: 关键实现 3 — AI 合规预审（模拟）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "关键实现 3：AI 合规预审（零后端模拟）", "AI Compliance Pre-Check — No Backend Needed");
  addFooter(slide, 7, TOTAL_SLIDES);

  // 左侧：核心逻辑（伪代码卡片）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y + 1, w: CONTENT_W / 2 - 0.15, h: CONTENT_H - 1.2,
    fill: { color: C.dark },
    line: { color: C.primary, pt: 1 },
    rectRadius: 0.08,
  });
  slide.addText("核心逻辑（20 行代码）", {
    x: CONTENT_X + 0.15, y: CONTENT_Y + 1.1, w: CONTENT_W / 2 - 0.45, h: 0.35,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.accent,
  });
  slide.addText(
`function aiPreCheck(review) {
  const text = review.comment;

  // 1. 违规词检测（直接 hidden）
  const badWords = DATA.cfg.words;
  if (badWords.some(w => text.includes(w)))
    return { status: "hidden", reason: "检测到违规词" };

  // 2. 联系方式检测（revise）
  const contactPatterns = [
    /微信|wx|加我|qq|邮箱|电话/,
    /1[3-9]\\d{9}/,           // 手机号
    /\\w+@\\w+/,              // 邮箱
  ];
  if (contactPatterns.some(p => p.test(text)))
    return { status: "revise", reason: "检测到联系方式" };

  // 3. 通过 → 进入人工审核
  return { status: "pending" };
}`,
    {
      x: CONTENT_X + 0.15, y: CONTENT_Y + 1.5, w: CONTENT_W / 2 - 0.45, h: CONTENT_H - 1.7,
      fontSize: 9, fontFace: "Consolas", color: C.accent, fit: "shrink", valign: "top",
    }
  );

  // 右侧：分流结果卡片
  const results = [
    { status: "hidden", label: "直接隐藏", icon: "🚫", color: C.dark, trigger: "违规词：代写 / 包过 / 加微信" },
    { status: "revise", label: "驳回修改", icon: "⚠️", color: C.gold, trigger: "联系方式：手机号 / 邮箱 / 微信号" },
    { status: "pending", label: "进入人工审核", icon: "⏳", color: C.secondary, trigger: "内容合规，正常流转" },
  ];

  const rX = CONTENT_X + CONTENT_W / 2 + 0.15;
  const rW = CONTENT_W / 2 - 0.15;
  const rH = (CONTENT_H - 1.2 - 0.4) / 3;

  results.forEach((r, i) => {
    const y = CONTENT_Y + 1 + i * (rH + 0.2);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rX, y, w: rW, h: rH,
      fill: { color: C.white },
      line: { color: r.color, pt: 1.5 },
      rectRadius: 0.08,
    });
    slide.addText(r.icon, {
      x: rX + 0.15, y: y + 0.1, w: 0.5, h: 0.5,
      fontSize: 24, align: "center",
    });
    slide.addText(r.label, {
      x: rX + 0.7, y: y + 0.1, w: 1.5, h: 0.35,
      fontSize: 14, fontFace: "Cambria", bold: true, color: r.color,
    });
    slide.addText(r.trigger, {
      x: rX + 0.7, y: y + 0.45, w: rW - 0.85, h: rH - 0.55,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 8: 从零搭建 — Step by Step
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "从零搭建 Step-by-Step", "Build From Scratch — 5 Steps");
  addFooter(slide, 8, TOTAL_SLIDES);

  const steps = [
    { num: "01", title: "搭骨架", time: "~30 min", desc: "HTML 结构 + DATA 对象 + render() 路由函数。先跑起来，能切换页面。" },
    { num: "02", title: "加角色", time: "~45 min", desc: "state.role 变量 + 四个角色的页面条件渲染。先让各角色能看到不同界面。" },
    { num: "03", title: "加评价", time: "~60 min", desc: "评价表单 + 状态机 + 提交分流。先实现 draft→pending→published 主路径，再加异常分支。" },
    { num: "04", title: "加 AI", time: "~40 min", desc: "aiPreCheck() 函数 + 违规词/联系方式检测 + 亮点提取（从评价聚合高频词）。" },
    { num: "05", title: "加审核台", time: "~50 min", desc: "queues() 聚合 4 个队列 + approve/reject/hide 动作 + 标记已处理。" },
  ];

  // 时间轴
  steps.forEach((s, i) => {
    const x = CONTENT_X;
    const y = CONTENT_Y + 1 + i * 0.85;
    const w = CONTENT_W;
    const h = 0.7;

    // 步骤卡
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.06,
    });
    // 步骤号
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 0.9, h,
      fill: { color: C.primary },
      rectRadius: 0.06,
    });
    slide.addText(s.num, {
      x, y, w: 0.9, h,
      fontSize: 18, fontFace: "Cambria", bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 1,
    });
    // 标题 + 时间
    slide.addText(`${s.title}`, {
      x: x + 1.05, y: y + 0.05, w: 2.5, h: 0.4,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.dark, valign: "middle",
    });
    slide.addText(`⏱️ ${s.time}`, {
      x: x + 1.05, y: y + 0.4, w: 2.5, h: 0.25,
      fontSize: 10, fontFace: "Calibri", color: C.secondary, valign: "middle",
    });
    // 描述
    slide.addText(s.desc, {
      x: x + 3.6, y: y + 0.1, w: w - 3.75, h: h - 0.2,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, valign: "middle", fit: "shrink",
    });
  });

  // 底部时间估计
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: SLIDE_H - 0.6, w: CONTENT_W, h: 0.4,
    fill: { color: C.accent, transparency: 85 },
    line: { color: C.accent, pt: 1 },
    rectRadius: 0.05,
  });
  slide.addText("⏰ 总工时估计：约 225 分钟（3.5 小时）。建议分两次 session：骨架 + 角色（第一次），评价 + AI + 审核（第二次）。", {
    x: CONTENT_X + 0.15, y: SLIDE_H - 0.55, w: CONTENT_W - 0.3, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.dark, bold: true, valign: "middle",
  });
}

// ============================================================
// Slide 9: 可扩展方向
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "后续可扩展方向", "What to Build Next");
  addFooter(slide, 9, TOTAL_SLIDES);

  const exts = [
    { icon: "🔌", title: "对接真实 LLM", desc: "aiPreCheck() 调用 LLM API 做更智能的内容审核和亮点总结" },
    { icon: "💾", title: "加后端存储", desc: "Express + SQLite 持久化 DATA 对象，多用户可共享评价数据" },
    { icon: "📱", title: "移动端适配", desc: "响应式布局改造，手机浏览器直接访问" },
    { icon: "🔐", title: "加真实登录", desc: "OAuth 对接学校 SSO，替代当前角色下拉框切换" },
    { icon: "📊", title: "数据统计面板", desc: "按学院/学期/教师聚合评价数据，生成可视化报表" },
    { icon: "🎓", title: "选课推荐算法", desc: "基于学生专业 + 历史评价 + 难度标签，做真正的个性化推荐" },
  ];

  const eW = (CONTENT_W - 0.3) / 3;
  const eH = (CONTENT_H - 1 - 0.3) / 2;
  exts.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = CONTENT_X + col * (eW + 0.15);
    const y = CONTENT_Y + 1 + row * (eH + 0.15);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: eW, h: eH,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.1,
    });
    slide.addText(e.icon, {
      x: x + 0.15, y: y + 0.2, w: 0.7, h: 0.7,
      fontSize: 30, align: "center",
    });
    slide.addText(e.title, {
      x: x + 0.95, y: y + 0.25, w: eW - 1.15, h: 0.45,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.dark, valign: "middle",
    });
    slide.addText(e.desc, {
      x: x + 0.15, y: y + 1.0, w: eW - 0.3, h: eH - 1.2,
      fontSize: 10.5, fontFace: "Calibri", color: C.text, fit: "shrink",
    });
  });
}

// ============================================================
// Slide 10: 快速上手 — 代码速查
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "快速上手：核心代码速查", "Cheat Sheet — Key Snippets");
  addFooter(slide, 10, TOTAL_SLIDES);

  // 三栏速查
  const snippets = [
    {
      title: "全局动作分发",
      code: `// HTML: [data-act="submitReview"]
// JS:
document.addEventListener("click", e => {
  const act = e.target.dataset.act;
  if (act && handleAction[act])
    handleAction[act](e);
});`,
    },
    {
      title: "render() 路由",
      code: `function render() {
  const page = state.page;
  if (page === "list") renderList();
  else if (page === "detail") renderDetail();
  else if (page === "admin") renderAdmin();
  // ...
}`,
    },
    {
      title: "DATA 单一数据源",
      code: `const DATA = {
  courses: [...],
  reviews: [...],
  cfg: { windowDays: 14,
         reportThreshold: 3,
         words: ["代写","包过"] },
};`,
    },
  ];

  const sW = (CONTENT_W - 0.3) / 3;
  const sH = CONTENT_H - 1.2;
  snippets.forEach((sn, i) => {
    const x = CONTENT_X + i * (sW + 0.15);
    const y = CONTENT_Y + 1;

    // 标题
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: sW, h: 0.5,
      fill: { color: C.primary },
      rectRadius: 0.05,
    });
    slide.addText(sn.title, {
      x: x + 0.1, y, w: sW - 0.2, h: 0.5,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.white, valign: "middle",
    });
    // 代码
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: y + 0.55, w: sW, h: sH - 0.55,
      fill: { color: C.codeBg },
      rectRadius: 0.05,
    });
    slide.addText(sn.code, {
      x: x + 0.15, y: y + 0.65, w: sW - 0.3, h: sH - 0.75,
      fontSize: 9, fontFace: "Consolas", color: C.accent, fit: "shrink", valign: "top",
    });
  });
}

// ============================================================
// Slide 11: 复现检查清单
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addTitle(slide, "复现检查清单", "Reproduction Checklist");
  addFooter(slide, 11, TOTAL_SLIDES);

  const checks = [
    { cat: "环境准备", items: ["任意现代浏览器（Chrome/Edge/Firefox）", "一个文本编辑器（VS Code 推荐）", "Node.js（仅用于打包 PPT，可选）"] },
    { cat: "功能验证", items: ["切换 4 种角色，各角色页面正确", "学生提交评价 → AI 预审 → 审核发布 → 可见", "违规词/联系方式正确拦截并走对应分支", "举报达 3 人自动隐藏，6 人恢复", "窗口期关闭后评价变只读"] },
    { cat: "交付检查", items: ["源码 zip 包含两个 HTML + README", "Git 仓库至少 3 次提交并推送到 GitHub", "PPT 覆盖痛点/方案/AI/功能/效果/收获", "演示视频录全流程 + 讲解", "口播视频录个人学习感想"] },
  ];

  checks.forEach((c, i) => {
    const y = CONTENT_Y + 1 + i * ((CONTENT_H - 1.2) / 3 + 0.07);
    const h = (CONTENT_H - 1.2) / 3;
    const x = CONTENT_X;
    const w = CONTENT_W;

    // 分类标题
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 1.8, h,
      fill: { color: C.primary },
      rectRadius: 0.06,
    });
    slide.addText(c.cat, {
      x, y, w: 1.8, h,
      fontSize: 14, fontFace: "Cambria", bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 1,
    });
    // 内容
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 1.85, y, w: w - 1.85, h,
      fill: { color: C.white },
      line: { color: C.lightGray, pt: 1 },
      rectRadius: 0.06,
    });
    c.items.forEach((item, j) => {
      slide.addText(`☐ ${item}`, {
        x: x + 2.0, y: y + 0.08 + j * ((h - 0.15) / c.items.length),
        w: w - 2.15, h: (h - 0.15) / c.items.length,
        fontSize: 10.5, fontFace: "Calibri", color: C.text, valign: "middle",
      });
    });
  });
}

// ============================================================
// Slide 12: 致谢 + 快速链接
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.dark };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.15, fill: { color: C.accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: SLIDE_H - 0.15, w: SLIDE_W, h: 0.15, fill: { color: C.secondary } });

  slide.addText("感谢学习", {
    x: 1, y: 1.5, w: 8, h: 0.8,
    fontSize: 40, fontFace: "Cambria", bold: true, color: C.white, charSpacing: 3, align: "center",
  });
  slide.addText("Skill Reproduction Complete", {
    x: 1, y: 2.3, w: 8, h: 0.4,
    fontSize: 18, fontFace: "Georgia", color: C.accent, italic: true, charSpacing: 3, align: "center",
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE_W / 2 - 1, y: 3.0, w: 2, h: 0.03, fill: { color: C.accent },
  });

  // 快速链接
  const links = [
    { label: "📁 原型源码", desc: "选课参考信息模块-高保真原型.html" },
    { label: "📄 PRD 文档", desc: "课程详情与评价模块PRD.html" },
    { label: "📦 源码包", desc: "course-review-src.zip" },
  ];

  links.forEach((l, i) => {
    slide.addText(`${l.label}\n${l.desc}`, {
      x: 1 + i * 3, y: 3.3, w: 2.8, h: 1.0,
      fontSize: 11, fontFace: "Calibri", color: C.lightGray, align: "center", valign: "middle", fit: "shrink",
    });
  });
}

// ============================================================
pres.writeFile({ fileName: "C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01\\技能复现实操-单文件AI应用.pptx" })
  .then(() => console.log("✓ 技能 PPT 生成成功"))
  .catch(err => console.error("✗ 失败:", err));
