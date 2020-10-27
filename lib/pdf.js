const { PDFDocument, rgb, StandardFonts} = require('pdf-lib');
const { PNG } = require("pngjs");
const fs = require('fs');

const createPDF = async (batch, screenshotArray)  => {

  console.log('👉 Generating screenflow for batch ' + batch.name + ' with ' + screenshotArray.length + ' screens')

  var maxHeight = 0;
  for (var l = 0; l < screenshotArray.length; l++) {
    const image = PNG.sync.read(screenshotArray[l]);
    maxHeight = Math.max(maxHeight,image.height)
  }

  const screenshotWidth = 1280
  const margin = screenshotWidth / 4
  const halfMargin = margin / 2
  const titleHeight = 80
  const marginUnderTitle = 120
  const imageNameHeight = 40
  const marginUnderImageName = 60

  const pdfDoc = await PDFDocument.create();
  const imagePage = pdfDoc.insertPage(0);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pageWidth = margin + ((screenshotArray.length) * (screenshotWidth + halfMargin)) + halfMargin;
  const pageHeight = maxHeight + margin + margin + titleHeight + imageNameHeight + marginUnderTitle + marginUnderImageName;

  imagePage.setSize(
    pageWidth,
    pageHeight);

    imagePage.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: rgb(0.8, 0.8, 0.8),
    })

    imagePage.drawText(
      batch.name,
      {
        x: margin,
        y: pageHeight - margin - titleHeight,
        font: helveticaFont,
        size: 120,
        color: rgb(0, 0, 0),
        lineHeight: 24,
        opacity: 0.75,
      },
    )

    for (var k = 0; k < screenshotArray.length; k++) {

      var img = await pdfDoc.embedPng(screenshotArray[k]);
      var { width, height } = img.scale(1);

      imagePage.drawImage(img, {
        x: margin + (k * (screenshotWidth + halfMargin)),
        y: pageHeight - height - margin - titleHeight - marginUnderTitle - imageNameHeight - marginUnderImageName
      });

      imagePage.drawText(
        batch.screens[k].name,
        {
          x: margin + (k * (screenshotWidth + halfMargin)),
          y: pageHeight - margin - titleHeight - marginUnderTitle - imageNameHeight,
          font: helveticaFont,
          size: 36,
          color: rgb(0, 0, 0),
          lineHeight: 24,
          opacity: 0.75,
        },
      )
    }

    const pdfBytes = await pdfDoc.save();
    const newFilePath = 'Screenflow - ' + batch.name + '.pdf';
    fs.writeFileSync(newFilePath, pdfBytes);

    console.log('💾 Finished creating screenflow for batch ' + batch.name + ' with ' + screenshotArray.length + ' screens')
}

module.exports = createPDF;
