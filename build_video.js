// 用 ffmpeg 把 13 张截图 + 中文字幕合成为演示视频
const { execFileSync } = require("child_process");
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
const path = require("path");
const fs = require("fs");

const ROOT = "C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01";
const SHOTS = path.join(ROOT, "shots");
const SEG = path.join(ROOT, "segs");

// 把字体复制到本地，避免 filter 参数里出现 "C:" 冒号导致解析失败
const FONT_SRC = ["C:\\Windows\\Fonts\\msyh.ttc", "C:\\Windows\\Fonts\\msyhbd.ttc", "C:\\Windows\\Fonts\\simhei.ttf"]
  .find(f => fs.existsSync(f));
const FONT_LOCAL = path.join(ROOT, "msyh.ttc");
if (FONT_SRC && !fs.existsSync(FONT_LOCAL)) fs.copyFileSync(FONT_SRC, FONT_LOCAL);
const FONT = "msyh.ttc";

const PLAN = [
  { f: "01-list-student.png", d: 6.5, cap: "选课学生登录后，首页即课程列表\n每门课都有评分、评价数与 AI 亮点标签" },
  { f: "02-detail-intro.png", d: 6.5, cap: "课程介绍：教学内容、考核方式与成绩占比\n选课前就能看清这门课到底讲什么" },
  { f: "03-detail-review.png", d: 7.0, cap: "学生评价：四维评分 + 标签 + 文字评语\n支持按高频标签一键筛选" },
  { f: "04-detail-teacher.png", d: 6.0, cap: "教师介绍：研究方向与授课风格\n补全「这门课谁在教、怎么教」" },
  { f: "05-eligible-list.png", d: 5.5, cap: "修读学生（成绩已发布）登录\n只有读过的课程才显示评价入口" },
  { f: "06-review-form.png", d: 7.0, cap: "评价表单：四维评分 + 1–5 个标签\n评语 20–500 字，默认匿名提交" },
  { f: "07-admin-audit.png", d: 6.5, cap: "教务审核工作台\n评价、介绍、举报、待代录四个队列集中处理" },
  { f: "08-admin-intro-queue.png", d: 5.5, cap: "介绍审核队列\n教师提交的课程介绍与教师介绍统一审核" },
  { f: "09-teacher-courses.png", d: 5.0, cap: "教师账号：我的课程\n可直接维护课程介绍、查看学生评价" },
  { f: "10-teacher-detail.png", d: 6.0, cap: "教师可公开回复学生评价\n回复同样需要审核通过后才展示" },
  { f: "11-window-closed.png", d: 5.5, cap: "评教窗口关闭后，评价变为只读\n防止非选课期刷评" },
  { f: "12-admin-intro-edit.png", d: 6.0, cap: "教师未及时维护时，教务可代录\n内容标记「教务代录」并通知教师" },
  { f: "13-final-list.png", d: 5.0, cap: "用 AI 补全信息，用审核保证可信\n让选课不再靠猜" },
];

if (!fs.existsSync(SEG)) fs.mkdirSync(SEG);

const list = [];

PLAN.forEach((p, i) => {
  const src = path.join(SHOTS, p.f);
  if (!fs.existsSync(src)) {
    console.log("跳过（缺图）:", p.f);
    return;
  }
  const capFile = path.join(SEG, "cap" + String(i + 1).padStart(2, "0") + ".txt");
  fs.writeFileSync(capFile, p.cap, "utf8");

  const out = path.join(SEG, "seg" + String(i + 1).padStart(2, "0") + ".mp4");
  const vf = [
    "scale=1920:1080",
    "drawbox=x=0:y=ih-168:w=iw:h=168:color=0x01343A@0.96:t=fill",
    "drawtext=fontfile=" + FONT + ":textfile=segs/cap" + String(i + 1).padStart(2, "0") + ".txt" +
      ":fontcolor=white:fontsize=33:line_spacing=14" +
      ":x=(w-text_w)/2:y=h-112",
  ].join(",");

  const args = [
    "-y", "-loop", "1", "-framerate", "30",
    "-i", "shots/" + p.f,
    "-t", String(p.d),
    "-vf", vf,
    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", "30",
    "segs/seg" + String(i + 1).padStart(2, "0") + ".mp4",
  ];

  try {
    execFileSync(ffmpeg, args, { stdio: "pipe", cwd: ROOT });
    console.log("生成分段", i + 1, p.f, p.d + "s");
    list.push(out);
  } catch (e) {
    console.log("失败:", p.f, e.message);
    if (e.stderr) console.log(e.stderr.toString().slice(-600));
  }
});

// 拼接
if (list.length) {
  const listFile = path.join(SEG, "list.txt");
  // concat 列表内的相对路径以列表文件所在目录为基准
  fs.writeFileSync(listFile, list.map(f => "file '" + path.basename(f) + "'").join("\n"), "utf8");
  const finalOut = path.join(ROOT, "3-学号姓名-系统讲解视频.mp4");
  try {
    execFileSync(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", "segs/list.txt", "-c", "copy", "3-学号姓名-系统讲解视频.mp4"], { stdio: "pipe", cwd: ROOT });
    console.log("合成完成:", finalOut);
  } catch (e) {
    console.log("拼接失败:", e.message);
    if (e.stderr) console.log(e.stderr.toString().slice(-600));
  }
}
