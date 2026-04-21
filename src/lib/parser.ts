import mammoth from 'mammoth';
import type { ParsedResume, Section, ContactInfo } from '../types';

export class ResumeParser {
  async parse(file: File): Promise<ParsedResume> {
    const fileType = this.detectFileType(file);
    
    let rawData;
    if (fileType === 'docx') {
      rawData = await this.parseDOCX(file);
    } else if (fileType === 'pdf') {
      rawData = await this.parsePDF(file);
    } else {
      rawData = await this.parseTXT(file);
    }
    
    const sections = this.extractSections(rawData.text);
    const bulletPoints = this.extractBulletPoints(rawData.text);
    const contactInfo = this.extractContactInfo(rawData.text);
    
    return {
      fullText: rawData.text,
      fileType,
      fileName: file.name,
      sections,
      bulletPoints,
      contactInfo,
      rawXML: rawData.rawXML,
      images: rawData.images || []
    };
  }
  
  private detectFileType(file: File): 'docx' | 'pdf' | 'txt' {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'docx') return 'docx';
    if (extension === 'pdf') return 'pdf';
    return 'txt';
  }
  
  private async parseDOCX(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    
    const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
    const textResult = await mammoth.extractRawText({ arrayBuffer });
    
    return {
      html: htmlResult.value,
      text: textResult.value,
      rawXML: htmlResult.value, // Simplified - in production, extract actual XML
      images: []
    };
  }
  
  private async parsePDF(file: File): Promise<{ text: string; rawXML?: string; images?: any[] }> {
    // PDF parsing - simplified for MVP
    // In production, use pdf-parse or pdf.js
    const text = await file.text();
    return {
      text,
      images: []
    };
  }
  
  private async parseTXT(file: File) {
    const text = await file.text();
    return {
      text,
      images: []
    };
  }
  
  private extractSections(text: string): Section[] {
    const sections: Section[] = [];
    
    const headerPatterns = [
      /^(SUMMARY|PROFESSIONAL SUMMARY|PROFILE|OBJECTIVE)/mi,
      /^(EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT|PROFESSIONAL EXPERIENCE)/mi,
      /^(EDUCATION|ACADEMIC BACKGROUND)/mi,
      /^(SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES)/mi,
      /^(CERTIFICATIONS|CERTIFICATES)/mi,
      /^(PROJECTS)/mi
    ];
    
    const lines = text.split('\n');
    let currentSection: Section | null = null;
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      const isHeader = headerPatterns.some(pattern => pattern.test(trimmed));
      
      if (isHeader && trimmed.length > 0) {
        if (currentSection) {
          sections.push(currentSection);
        }
        
        currentSection = {
          header: trimmed,
          content: [],
          startLine: index
        };
      } else if (currentSection && trimmed) {
        currentSection.content.push(trimmed);
      }
    });
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }
  
  private extractBulletPoints(text: string): string[] {
    const bullets: string[] = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      if (/^[•\-\*◦▪]/.test(trimmed)) {
        const bullet = trimmed.replace(/^[•\-\*◦▪]\s*/, '');
        if (bullet.length > 10) {
          bullets.push(bullet);
        }
      }
    });
    
    return bullets;
  }
  
  private extractContactInfo(text: string): ContactInfo {
    const contact: ContactInfo = {
      name: null,
      phone: null,
      email: null,
      location: null,
      linkedin: null,
      website: null
    };
    
    // Name extraction (first line, typically)
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine.length < 50 && /^[A-Z]/.test(firstLine)) {
        contact.name = firstLine;
      }
    }
    
    // Phone extraction
    const phoneRegex = /(\+?1?\s*[-.]?\s*)?(\(?\d{3}\)?)\s*[-.]?\s*(\d{3})\s*[-.]?\s*(\d{4})/;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) contact.phone = phoneMatch[0];
    
    // Email extraction
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) contact.email = emailMatch[0];
    
    // LinkedIn extraction
    const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+/i;
    const linkedinMatch = text.match(linkedinRegex);
    if (linkedinMatch) contact.linkedin = linkedinMatch[0];
    
    // Location extraction
    const locationRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2})/;
    const locationMatch = text.match(locationRegex);
    if (locationMatch) contact.location = locationMatch[0];
    
    return contact;
  }
}
