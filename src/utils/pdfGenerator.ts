import jsPDF from "jspdf";
import { logo } from "../assets/assets";
import { chapters, Chapter } from "../data/chapters";

const getImageData = async (src: string, format: string = 'image/jpeg'): Promise<{dataUrl: string, ratio: number}> => {
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

  const addBranding = () => {
    if (logoDataUrl) {
      const logoW = 20;
      const logoH = logoRatio * logoW;
      doc.addImage(logoDataUrl, "PNG", margin, 10, logoW, logoH);
    }
    doc.setFontSize(8);
    doc.setTextColor(181, 154, 109); // Gold-ish
    doc.text("MK CREATIONS ART OF SURFACES 2026", pageWidth - margin, 15, { align: "right" });
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
  
  // === INTRO PAGE ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.text("The Vision", margin, 40);
  doc.setLineWidth(0.5);
  doc.line(margin, 45, margin + 30, 45);
  
  doc.setFont("times", "italic");
  doc.setFontSize(14);
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
    doc.setFontSize(10);
    doc.setTextColor(181, 154, 109);
    doc.text(`CHAPTER ${chapter.number} — ${chapter.category.toUpperCase()}`, margin, 35);
    
    doc.setFontSize(28);
    doc.setTextColor(44, 41, 38);
    doc.text(chapter.title, margin, 48);
    
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.setTextColor(138, 111, 72);
    doc.text(chapter.subtitle, margin, 56);
    
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    let yPos = 70;
    
    // Intro quote
    doc.setFont("times", "italic");
    const chIntro = `"${chapter.intro}"`;
    const chIntroLines = doc.splitTextToSize(chIntro, contentWidth);
    doc.text(chIntroLines, margin, yPos);
    yPos += chIntroLines.length * 5 + 10;
    
    // Body text
    doc.setFont("times", "normal");
    for (const p of chapter.body) {
      const pLines = doc.splitTextToSize(p, contentWidth);
      doc.text(pLines, margin, yPos);
      yPos += pLines.length * 5 + 5;
    }
    
    // Specs
    yPos += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    doc.setFontSize(8);
    doc.setTextColor(181, 154, 109);
    let specX = margin;
    let specY = yPos;
    
    chapter.specs.forEach((spec, idx) => {
      doc.setFont("times", "bold");
      doc.text(spec.label.toUpperCase(), specX, specY);
      doc.setFont("times", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(spec.value, specX, specY + 4);
      
      specX += contentWidth / 2;
      if (idx % 2 === 1) {
        specX = margin;
        specY += 12;
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
      const gap = 10;
      const cellW = (contentWidth - gap) / 2;
      const cellH = cellW * (4 / 3); // 3:4 ratio
      
      const totalRows = Math.ceil(chunk.length / cols);
      const gridTotalHeight = totalRows * cellH + (totalRows - 1) * gap;
      
      const startY = 40 + (230 - gridTotalHeight) / 2;
      
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
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          const capLines = doc.splitTextToSize(imgData.caption, cellW);
          doc.text(capLines, xPos + cellW / 2, yPos + cellH + 4, { align: "center" });
          
        } catch (e) {
          console.error("Failed to add image to PDF", e);
        }
      }
      
      addPageFooter(currentPage++);
    }
  }

  // === BACK COVER ===
  doc.addPage();
  addBranding();
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.text("MK CREATIONS", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("times", "normal");
  doc.text("Rajkot · Gujarat", pageWidth / 2, pageHeight / 2, { align: "center" });
  doc.text("www.mkcreations.artofsurfaces", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
  
  addPageFooter(currentPage++);

  doc.save("MK_Creations_Brochure.pdf");
};
