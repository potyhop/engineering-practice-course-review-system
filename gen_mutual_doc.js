// ============================================================
// 互助加分项 - Word 表格模板
// 帮助他人解决问题的完整对话记录
// ============================================================

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
        HeadingLevel } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

// 表头单元格
function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "028090", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text, bold: true, color: "FFFFFF", size: 20,
        font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
      })]
    })]
  });
}

// 普通单元格
function cell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({
        text, size: 18,
        font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" },
        ...opts
      })]
    })]
  });
}

// 图片占位单元格（用户粘贴截图用）
function imageCell(width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text: "📷 在此粘贴对话截图",
        size: 16, color: "6A7B76", italics: true,
        font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
      })]
    })]
  });
}

// 表格列宽（A4 内容区约 9026 DXA）
// 序号 | 帮助对象 | 问题描述 | 解决方案 | 截图 | 时间
const colWidths = [600, 1200, 2000, 2200, 2000, 1026];

// 示例数据（用户需替换为自己的真实记录）
const examples = [
  ["1", "张三", "原型跑不起来，浏览器报错", "检查后发现是文件路径含中文，改成纯英文路径解决", "", "2026-11-05"],
  ["2", "李四", "Git push 提示 authentication failed", "帮他生成 Personal Access Token 并配置 credential manager", "", "2026-11-07"],
  ["3", "王五", "PPT 里的表格超出页面边界", "调整列宽总和为 9360 DXA（A4 内容宽度），问题解决", "", "2026-11-09"],
];

const tableRows = [
  // 表头行
  new TableRow({
    cantSplit: true,
    children: [
      headerCell("序号", colWidths[0]),
      headerCell("帮助对象", colWidths[1]),
      headerCell("问题描述", colWidths[2]),
      headerCell("解决方案", colWidths[3]),
      headerCell("对话截图", colWidths[4]),
      headerCell("解决时间", colWidths[5]),
    ]
  }),
  // 数据行（用户需替换截图并自行扩展）
  ...examples.map(row => new TableRow({
    cantSplit: true,
    children: [
      cell(row[0], colWidths[0]),
      cell(row[1], colWidths[1]),
      cell(row[2], colWidths[2]),
      cell(row[3], colWidths[3]),
      imageCell(colWidths[4]),
      cell(row[5], colWidths[5]),
    ]
  })),
];

// 预留空行让用户继续添加
for (let i = 0; i < 3; i++) {
  tableRows.push(new TableRow({
    cantSplit: true,
    children: [
      cell("", colWidths[0]),
      cell("", colWidths[1]),
      cell("", colWidths[2]),
      cell("", colWidths[3]),
      imageCell(colWidths[4]),
      cell("", colWidths[5]),
    ]
  }));
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" },
          size: 22
        }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 }
      }
    },
    children: [
      // 标题
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({
          text: "小组互助贡献记录表",
          bold: true, size: 36, color: "014046",
          font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
        })]
      }),
      // 副标题
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({
          text: "工程项目认知实践课程 · 互助加分项",
          size: 20, color: "6A7B76", italics: true,
          font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
        })]
      }),
      // 说明
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "说明：请将示例行替换为你真实帮助同学解决问题的记录。截图列请粘贴完整的对话截图（QQ/微信/飞书等）。可在 Word 中右键表格 → 插入行来继续添加。",
          size: 18, color: "6A7B76",
          font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
        })]
      }),
      // 表格
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: colWidths,
        rows: tableRows
      }),
      // 空行
      new Paragraph({ children: [new TextRun({ text: "", size: 200 })] }),
      // 统计
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: "共帮助解决问题数：", bold: true, size: 20,
            font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
          }),
          new TextRun({
            text: "______ 个", size: 20,
            font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" }
          }),
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\pc\\Documents\\Trae-CN\\temp_20261024_01\\小组互助贡献记录表.docx", buffer);
  console.log("✓ Word 模板生成成功");
});
