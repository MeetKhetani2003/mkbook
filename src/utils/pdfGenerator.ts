import jsPDF from "jspdf";
import { logo } from "../assets/assets";
import { chapters, Chapter } from "../data/chapters";

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
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
  let logoImg: HTMLImageElement | null = null;
  try {
    logoImg = await loadImage(logo);
  } catch (e) {
    console.error("Failed to load logo for PDF", e);
  }

  const addBranding = () => {
    if (logoImg) {
      const logoW = 20;
      const logoH = (logoImg.height / logoImg.width) * logoW;
      doc.addImage(logoImg, "PNG", margin, 10, logoW, logoH);
    }
    doc.setFontSize(8);
    doc.setTextColor(181, 154, 109); // Gold-ish
    doc.text("MK CREATIONS · ATELIER · MMXXVI", pageWidth - margin, 15, { align: "right" });
    doc.setDrawColor(181, 154, 109);
    doc.setLineWidth(0.1);
    doc.line(margin, 20, pageWidth - margin, 20);
  };

  const addPageFooter = (pageNumber: number) => {
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    doc.text("Rajkot · Milano · Global", pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  let currentPage = 1;

  // === COVER PAGE ===
  addBranding();
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.setTextColor(44, 41, 38); // Charcoal
  doc.text("FOLIO OF SURFACES", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
  
  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.setTextColor(138, 111, 72); // Bronze
  doc.text("An Architectural Atelier", pageWidth / 2, pageHeight / 2 - 10, { align: "center" });
  
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Volume IX · MMXXVI", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
  
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
  const introText = "MK Creations is an architectural atelier dedicated to the art of the surface. We believe that the ground we walk on and the walls that surround us are more than functional boundaries — they are canvases for architectural expression.";
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
    
    // Chapter Image Pages
    for (const imgData of chapter.images) {
      doc.addPage();
      addBranding();
      
      try {
        const img = await loadImage(imgData.src);
        const imgRatio = img.height / img.width;
        
        // Fit image to page width (with margins)
        const displayW = contentWidth;
        const displayH = displayW * imgRatio;
        
        // If it's too tall, fit to height
        let finalW = displayW;
        let finalH = displayH;
        const maxH = pageHeight - 80; // leave space for header/footer
        
        if (finalH > maxH) {
          finalH = maxH;
          finalW = finalH / imgRatio;
        }
        
        const xPos = (pageWidth - finalW) / 2;
        const yPos = 40 + (maxH - finalH) / 2;
        
        doc.addImage(img, "JPEG", xPos, yPos, finalW, finalH);
        
        // Caption
        doc.setFont("times", "italic");
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const capLines = doc.splitTextToSize(imgData.caption, contentWidth);
        doc.text(capLines, pageWidth / 2, yPos + finalH + 10, { align: "center" });
        
      } catch (e) {
        console.error("Failed to add image to PDF", e);
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
  doc.text("Rajkot · Milano", pageWidth / 2, pageHeight / 2, { align: "center" });
  doc.text("www.mkcreations.atelier", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
  
  addPageFooter(currentPage++);

  doc.save("MK_Creations_Brochure.pdf");
};
