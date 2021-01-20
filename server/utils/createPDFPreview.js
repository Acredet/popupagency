const { spawn } = require("child_process");

const filePath = `${__dirname}/../uploads/images/`;

const createPreview = (pdfName) => {
  spawn("python", [
    "external-script/pdf-preview.py",
    `${filePath}/${pdfName}`,
    `${filePath}/${pdfName.substring(0, pdf.length - 3)}png`,
  ]);
};
module.exports = createPreview;
