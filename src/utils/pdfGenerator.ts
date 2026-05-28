import jsPDF from "jspdf";
import { logo, office, front_cover, back_cover } from "../assets/assets";
import { chapters } from "../data/chapters";

const getImageData = async (src: string, format: string = 'image/jpeg'): Promise<{ dataUrl: string, ratio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve({ dataUrl: canvas.toDataURL(format, 0.9), ratio: img.height / img.width });
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };
    img.onerror = reject;
    img.src = src;
  });
};


export const generateBrochurePDF = async () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  doc.setLineHeightFactor(1.1);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Load logo once
  let logoDataUrl: string | null = null;
  let logoRatio = 1;
  let officeDataUrl: string | null = null;
  let officeRatio = 1;
  try {
    const logoObj = await getImageData(logo, 'image/png');
    logoDataUrl = logoObj.dataUrl;
    logoRatio = logoObj.ratio;
    
    const officeObj = await getImageData(office, 'image/png');
    officeDataUrl = officeObj.dataUrl;
    officeRatio = officeObj.ratio;
  } catch(e) {
    console.error("Failed to load branding images", e);
  }

  // Load front cover
  let frontCoverDataUrl: string | null = null;
  let backCoverDataUrl: string | null = null;
  try {
    const frontObj = await getImageData(front_cover, 'image/png');
    frontCoverDataUrl = frontObj.dataUrl;
    const backObj = await getImageData(back_cover, 'image/png');
    backCoverDataUrl = backObj.dataUrl;
  } catch(e) {
    console.error("Failed to load cover images for PDF", e);
  }

  const addBranding = () => {
    if (logoDataUrl) {
      const logoW = 20;
      const logoH = logoRatio * logoW;
      doc.addImage(logoDataUrl, "PNG", margin, 10, logoW, logoH);
    }
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0); // Gold-ish
    doc.text("MK CREATION ART OF SURFACES", pageWidth - margin, 15, { align: "right" });
    
    
    
  };

  const addPageFooter = (pageNumber: number) => {
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    doc.text("Rajkot · Gujarat", pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  let currentPage = 1;

  // === COVER PAGE ===
  if (frontCoverDataUrl) {
    doc.addImage(frontCoverDataUrl, "PNG", 0, 0, pageWidth, pageHeight);
  }

  // === TITLE PAGE (Folio of Surfaces) ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "normal");
  doc.setFontSize(32);
  doc.setTextColor(0, 0, 0);
  doc.text("Folio of Surfaces", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Volume 1 · 2026", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
  addPageFooter(currentPage++);

    // === INTRO PAGE ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "normal");
  doc.setFontSize(26);
  doc.setTextColor(0, 0, 0);
  doc.text("The Vision", margin, 45); // shifted down from 30

  doc.setFontSize(12);
  const introText = "MK Creation is a brand focus on the Architectural art. We believe that the ground we walk on and the walls that surround us are more than functional boundaries _ they are canvases for Art Expression.";
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, 55); // shifted down from 42

  let currentY = 55 + introLines.length * 6; // start from 55

  if (officeDataUrl) {
    const imgW = contentWidth;
    const imgH = officeRatio * imgW;
    // ensure image doesn't overflow page
    const maxImgH = pageHeight - currentY - 60; // leave ~60mm for Our Stories
    const finalImgH = Math.min(imgH, maxImgH);
    const finalImgW = finalImgH / officeRatio;
    const imgX = margin + (contentWidth - finalImgW) / 2; // center image
    doc.addImage(officeDataUrl, "PNG", imgX, currentY + 5, finalImgW, finalImgH);
    currentY += finalImgH + 25; // increased gap to prevent clipping into Our Stories
  }

  doc.setFontSize(26);
  doc.text("Our Stories", margin, currentY);
  currentY += 10;
  doc.setFontSize(12);
  const storyText = "At MK Creation, we don't just create products — we create emotions, spirituality, and artistic identity. Based in Rajkot, Gujarat, our studio blends traditional craftsmanship with modern creativity to craft premium customized art with timeless appeal. What started as a passion for art has now become a vision to create meaningful artistic experiences that connect culture, creativity, and innovation together.";
  const storyLines = doc.splitTextToSize(storyText, contentWidth);
  doc.text(storyLines, margin, currentY);

  addPageFooter(currentPage++);

  // === CHAPTERS ===
  for (const chapter of chapters) {
    // Chapter Editorial Page
    doc.addPage();
    addBranding();

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`CHAPTER ${chapter.number} — ${chapter.category.toUpperCase()}`, margin, 35);

    doc.setFontSize(32);
    doc.setTextColor(0, 0, 0);
    doc.text(chapter.title, margin, 50);

    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(chapter.subtitle, margin, 60);

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 80;

    // Intro quote
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    const chIntro = `"${chapter.intro}"`;
    const chIntroLines = doc.splitTextToSize(chIntro, contentWidth);
    doc.text(chIntroLines, margin, yPos);
    yPos += chIntroLines.length * 7 + 10;

    // Body text
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    for (const p of chapter.body) {
      const pLines = doc.splitTextToSize(p, contentWidth);
      doc.text(pLines, margin, yPos);
      yPos += pLines.length * 6 + 6;
    }

    // Specs
    yPos += 5;
    
    
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    let specX = margin;
    let specY = yPos;

    // Distribute remaining height among specs to fill empty space elegantly without overflowing
    const availableHeight = pageHeight - yPos - 25; // 25mm margin for footer
    const numRows = Math.ceil(chapter.specs.length / 2);
    // Calculate a comfortable spacing: max 30mm so it doesn't look too disconnected, min 14mm to avoid overlap
    let dynamicSpacing = availableHeight / numRows;
    if (dynamicSpacing > 20) dynamicSpacing = 20;
    if (dynamicSpacing < 12) dynamicSpacing = 12;

    let rowMaxLines = 1;
    chapter.specs.forEach((spec, idx) => {
      const valLines = doc.splitTextToSize(spec.value, contentWidth / 2 - 10);
      if (valLines.length > rowMaxLines) rowMaxLines = valLines.length;

      doc.setFont("times", "normal");
      doc.text(spec.label.toUpperCase(), specX, specY);
      doc.setFont("times", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(valLines, specX, specY + 6.5);

      specX += contentWidth / 2;
      if (idx % 2 === 1) {
        specX = margin;
        // The space to the next row is dynamic spacing + extra space for multi-line
        specY += dynamicSpacing + (rowMaxLines > 1 ? (rowMaxLines - 1) * 3.5 : 0);
        rowMaxLines = 1; // reset for next row
      }
    });

    addPageFooter(currentPage++);

    // Chapter Image Pages (Grid Layout)
    const chunkSize = 4;
    for (let i = 0; i < chapter.images.length; i += chunkSize) {
      doc.addPage();
      addBranding();

      const chunk = chapter.images.slice(i, i + chunkSize);

      // Grid configuration: 2 columns
      const cols = 2;
      const gap = 24; // Increased gap to prevent long captions from overlapping images below
      const cellW = (contentWidth - gap) / 2;
      const cellH = cellW * (4 / 3); // 3:4 ratio

      const totalRows = Math.ceil(chunk.length / cols);
      const gridTotalHeight = totalRows * cellH + (totalRows - 1) * gap;

      const startY = 35 + (245 - gridTotalHeight) / 2; // Shift slightly higher to accommodate larger gap

      for (let j = 0; j < chunk.length; j++) {
        const imgData = chunk[j];
        const row = Math.floor(j / cols);
        const col = j % cols;

        const xPos = margin + col * (cellW + gap);
        const yPos = startY + row * (cellH + gap);

        try {
          const imgObj = await getImageData(imgData.src, 'image/jpeg');

          doc.addImage(imgObj.dataUrl, "JPEG", xPos, yPos, cellW, cellH);

          doc.setFont("times", "normal");
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          const capLines = doc.splitTextToSize(imgData.caption, cellW);
          doc.text(capLines, xPos + cellW / 2, yPos + cellH + 5, { align: "center" });

        } catch (e) {
          console.error("Failed to add image to PDF", e);
        }
      }

      addPageFooter(currentPage++);
    }
  }

    // === BACK COVER ===
  doc.addPage();
  if (backCoverDataUrl) {
    doc.addImage(backCoverDataUrl, "PNG", 0, 0, pageWidth, pageHeight);

    // We do NOT draw QR codes manually anymore, as the user has baked them into the back_cover.png asset.

  } else {
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
  }

  doc.save("MK_Creations_Brochure.pdf");
};

