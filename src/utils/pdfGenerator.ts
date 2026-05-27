import jsPDF from "jspdf";
import { logo, instagramqr, locationqr, front_cover, back_cover } from "../assets/assets";
import { chapters, Chapter } from "../data/chapters";

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
const getSquareImageData = async (
  src: string,
  format: string = "image/png"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const size = Math.min(img.width, img.height);

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(
        img,
        (img.width - size) / 2,
        (img.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      resolve(canvas.toDataURL(format));
    };

    img.onerror = reject;
    img.src = src;
  });
};
const getTrimmedQR = async (src: string): Promise<{ dataUrl: string, ratio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context failed"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = 0;
      let maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];
          const alpha = imageData.data[idx + 3];

          // Trim both transparent pixels AND white padding from the outside
          const isWhite = r > 245 && g > 245 && b > 245;
          if (alpha > 10 && !isWhite) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;

      const outCanvas = document.createElement("canvas");
      outCanvas.width = cropWidth;
      outCanvas.height = cropHeight;

      const outCtx = outCanvas.getContext("2d");

      if (!outCtx) {
        reject(new Error("Canvas context failed"));
        return;
      }

      outCtx.drawImage(
        canvas,
        minX,
        minY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      resolve({ dataUrl: outCanvas.toDataURL("image/png"), ratio: cropHeight / cropWidth });
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
  try {
    const logoObj = await getImageData(logo, 'image/png');
    logoDataUrl = logoObj.dataUrl;
    logoRatio = logoObj.ratio;
  } catch (e) {
    console.error("Failed to load logo for PDF", e);
  }

  // Load front and back covers
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
    doc.setTextColor(181, 154, 109); // Gold-ish
    doc.text("MK CREATION ART OF SURFACES", pageWidth - margin, 15, { align: "right" });
    doc.setDrawColor(181, 154, 109);
    doc.setLineWidth(0.1);
    doc.line(margin, 20, pageWidth - margin, 20);
  };

  const addPageFooter = (pageNumber: number) => {
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    doc.text("Rajkot · Gujarat", pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  let currentPage = 1;

  // === COVER PAGE ===
  if (frontCoverDataUrl) {
    doc.addImage(frontCoverDataUrl, "PNG", 0, 0, pageWidth, pageHeight);
  } else {
    addBranding();
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.setTextColor(44, 41, 38); // Charcoal
    doc.text("Folio of Arts", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });

    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(138, 111, 72); // Bronze
    doc.text("Volume 1 · 2026", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
    addPageFooter(currentPage++);
  }

  // === INTRO PAGE ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.text("The Vision", margin, 40);
  doc.setLineWidth(0.5);
  doc.line(margin, 45, margin + 40, 45);

  doc.setFont("times", "italic");
  doc.setFontSize(17);
  doc.setTextColor(100, 100, 100);
  const introText = "MK Creation is a brand focus on the Architectural art. We believe that the ground we walk on and the walls that surround us are more than functional boundaries _ they are canvases for Art Expression.";
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, 60);

  addPageFooter(currentPage++);

  // === CHAPTERS ===
  for (const chapter of chapters) {
    // Chapter Editorial Page
    doc.addPage();
    addBranding();

    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.setTextColor(181, 154, 109);
    doc.text(`CHAPTER ${chapter.number} — ${chapter.category.toUpperCase()}`, margin, 35);

    doc.setFontSize(34);
    doc.setTextColor(44, 41, 38);
    doc.text(chapter.title, margin, 50);

    doc.setFont("times", "italic");
    doc.setFontSize(15);
    doc.setTextColor(138, 111, 72);
    doc.text(chapter.subtitle, margin, 60);

    doc.setFont("times", "normal");
    doc.setFontSize(13);
    doc.setTextColor(60, 60, 60);
    let yPos = 80;

    // Intro quote
    doc.setFont("times", "italic");
    doc.setFontSize(15);
    const chIntro = `"${chapter.intro}"`;
    const chIntroLines = doc.splitTextToSize(chIntro, contentWidth);
    doc.text(chIntroLines, margin, yPos);
    yPos += chIntroLines.length * 5.5 + 8;

    // Body text
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    for (const p of chapter.body) {
      const pLines = doc.splitTextToSize(p, contentWidth);
      doc.text(pLines, margin, yPos);
      yPos += pLines.length * 5.5 + 5;
    }

    // Specs
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.setTextColor(181, 154, 109);
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

      doc.setFont("times", "bold");
      doc.text(spec.label.toUpperCase(), specX, specY);
      doc.setFont("times", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(valLines, specX, specY + 4.5);

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

          doc.setFont("times", "italic");
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
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
  } else {
    addBranding();
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("MK CREATION", pageWidth / 2, pageHeight / 2 - 30, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("times", "normal");

    doc.text("RADHE KRISHNA PARK -2", pageWidth / 2, pageHeight / 2 - 15, { align: "center" });
    doc.text("INFRONT OF RAMESHWARAM PARTY LAWNS,", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
    doc.text("KALAWAD ROAD NEAR COSMOPLEX CINEMA, MOTA MAVA", pageWidth / 2, pageHeight / 2 - 5, { align: "center" });
    doc.text("RAJKOT-360005, GUJARAT", pageWidth / 2, pageHeight / 2, { align: "center" });

    doc.text("CONTACT:-", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
    doc.text("9558787870", pageWidth / 2, pageHeight / 2 + 15, { align: "center" });
    doc.text("9274787870", pageWidth / 2, pageHeight / 2 + 20, { align: "center" });
  }

  // Add QR codes
  // We will position the real QR codes exactly over the fake ones on the left side of the back cover image.
  try {
    const instagramQRObj = await getTrimmedQR(instagramqr);
    const locationQRObj = await getTrimmedQR(locationqr);

    // ==========================================
    // --- ADJUSTABLE QR CONFIGURATION ---
    // Tweak these values to adjust QR placement and size on the back cover
    // ==========================================
    const qrConfig = {
      width: 23,  // Slightly wider
      y: 161,     // Moved down ~5px equivalent (from 159 to 161)
      x1: 5,      // Moved left ~5px equivalent (from 7 to 5)
      x2: 33      // Moved left ~5px equivalent (from 35 to 33)
    };

    const instH = qrConfig.width * instagramQRObj.ratio;
    const locH = qrConfig.width * locationQRObj.ratio;

    // Draw a beige rectangle to cover BOTH fake QRs perfectly 
    // Shifted down to y=152 so it NO LONGER cuts off the bottom border of the icons above!
    doc.setFillColor(247, 243, 235); // Lighter beige to blend better
    doc.rect(4, 152, 57, 42, 'F');

    // Instagram QR
    doc.addImage(
      instagramQRObj.dataUrl,
      "PNG",
      qrConfig.x1,
      qrConfig.y,
      qrConfig.width,
      instH
    );

    // Location QR
    doc.addImage(
      locationQRObj.dataUrl,
      "PNG",
      qrConfig.x2,
      qrConfig.y,
      qrConfig.width,
      locH
    );

  } catch (e) {
    console.error("Failed to load QR codes for PDF", e);
  }

  doc.save("MK_Creations_Brochure.pdf");
};
