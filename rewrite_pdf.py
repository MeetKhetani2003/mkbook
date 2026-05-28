import re

with open('src/utils/pdfGenerator.ts', 'r') as f:
    content = f.read()

# 1. Replace all font styles to normal
content = re.sub(r'doc\.setFont\("times",\s*"(italic|bold)"\);', 'doc.setFont("times", "normal");', content)
content = re.sub(r'doc\.setFont\("times"\);', 'doc.setFont("times", "normal");', content)

# 2. Replace all text colors to black
content = re.sub(r'doc\.setTextColor\([^)]+\);', 'doc.setTextColor(0, 0, 0);', content)

# 3. Remove lines (underlines/separators)
content = re.sub(r'doc\.line\([^)]+\);', '', content)
content = re.sub(r'doc\.setLineWidth\([^)]+\);', '', content)
content = re.sub(r'doc\.setDrawColor\([^)]+\);', '', content)

# 4. Remove backCoverDataUrl usage to drop the back cover image that has Our Stories
back_cover_replacement = """  // === BACK COVER ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "normal");
  doc.setFontSize(40);
  doc.setTextColor(0, 0, 0);
  doc.text("MK CREATION", pageWidth / 2, pageHeight / 2 - 60, { align: "center" });

  doc.setFontSize(18);

  doc.text("RADHE KRISHNA PARK -2", pageWidth / 2, pageHeight / 2 - 30, { align: "center" });
  doc.text("INFRONT OF RAMESHWARAM PARTY LAWNS,", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
  doc.text("KALAWAD ROAD NEAR COSMOPLEX CINEMA, MOTA MAVA", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
  doc.text("RAJKOT-360005, GUJARAT", pageWidth / 2, pageHeight / 2, { align: "center" });

  doc.text("CONTACT:-", pageWidth / 2, pageHeight / 2 + 20, { align: "center" });
  doc.text("9558787870", pageWidth / 2, pageHeight / 2 + 30, { align: "center" });
  doc.text("9274787870", pageWidth / 2, pageHeight / 2 + 40, { align: "center" });

  // Add QR codes
  try {
    const instagramQRObj = await getTrimmedQR(instagramqr);
    const locationQRObj = await getTrimmedQR(locationqr);

    const qrWidth = 35;
    const gap = 20;
    const startX = (pageWidth - (qrWidth * 2 + gap)) / 2;
    const qrY = pageHeight - 50;

    const instH = qrWidth * instagramQRObj.ratio;
    const locH = qrWidth * locationQRObj.ratio;

    doc.addImage(instagramQRObj.dataUrl, "PNG", startX, qrY, qrWidth, instH);
    doc.addImage(locationQRObj.dataUrl, "PNG", startX + qrWidth + gap, qrY, qrWidth, locH);

  } catch (e) {
    console.error("Failed to load QR codes for PDF", e);
  }

  doc.save("MK_Creations_Brochure.pdf");
};
"""
# Replace the back cover section
content = re.sub(r'// === BACK COVER ===.*?doc\.save\("MK_Creations_Brochure\.pdf"\);\n};', back_cover_replacement, content, flags=re.DOTALL)

# 5. Fix Intro Page to include "Our Stories" and the shared image
intro_page_replacement = """  // === INTRO PAGE ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "normal");
  doc.setFontSize(36);
  doc.setTextColor(0, 0, 0);
  doc.text("The Vision", margin, 30);

  doc.setFontSize(20);
  const introText = "MK Creation is a brand focus on the Architectural art. We believe that the ground we walk on and the walls that surround us are more than functional boundaries _ they are canvases for Art Expression.";
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, 45);

  let currentY = 45 + introLines.length * 9;

  if (logoDataUrl) {
    const imgW = contentWidth;
    const imgH = logoRatio * imgW;
    // ensure image doesn't overflow page
    const maxImgH = pageHeight - currentY - 80; // leave 80mm for Our Stories
    const finalImgH = Math.min(imgH, maxImgH);
    const finalImgW = finalImgH / logoRatio;
    const imgX = margin + (contentWidth - finalImgW) / 2; // center image
    doc.addImage(logoDataUrl, "PNG", imgX, currentY + 5, finalImgW, finalImgH);
    currentY += finalImgH + 20;
  }

  doc.setFontSize(36);
  doc.text("Our Stories", margin, currentY);
  currentY += 15;
  doc.setFontSize(20);
  const storyText = "Driven by a passion for architectural artistry, we master the intricate craft of inlay work, transforming raw materials into timeless narratives. Every piece holds an extraordinary story, shaped by time, precision, and handcrafting excellence.";
  const storyLines = doc.splitTextToSize(storyText, contentWidth);
  doc.text(storyLines, margin, currentY);

  addPageFooter(currentPage++);"""
content = re.sub(r'// === INTRO PAGE ===.*?addPageFooter\(currentPage\+\+\);', intro_page_replacement, content, flags=re.DOTALL)

# 6. Enlarge fonts in Chapter pages
content = content.replace('doc.setFontSize(13);', 'doc.setFontSize(18);')
content = content.replace('doc.setFontSize(34);', 'doc.setFontSize(40);')
content = content.replace('doc.setFontSize(15);', 'doc.setFontSize(22);')
content = content.replace('doc.setFontSize(11);', 'doc.setFontSize(16);')
content = content.replace('yPos += pLines.length * 5.5 + 5;', 'yPos += pLines.length * 8 + 6;')
content = content.replace('yPos += chIntroLines.length * 5.5 + 8;', 'yPos += chIntroLines.length * 8 + 10;')
content = content.replace('+ 4.5', '+ 6.5') # spec value offset

with open('src/utils/pdfGenerator.ts', 'w') as f:
    f.write(content)
