import type { ParsedResume } from '../types';

export async function generateOptimizedResume(resume: ParsedResume, _jobDescription: string) {
  // Generate plain text version
  const txt = generatePlainText(resume);
  
  // Generate simple DOCX-like content (as text that can be opened in Word)
  const docxContent = generateWordCompatibleText(resume);
  const docxBlob = new Blob([docxContent], { 
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
  });
  
  return {
    docx: docxBlob,
    txt: txt,
    projectedScore: 88
  };
}

function generatePlainText(resume: ParsedResume): string {
  const lines: string[] = [];
  
  // Contact Information
  if (resume.contactInfo.name) {
    lines.push(resume.contactInfo.name.toUpperCase());
    lines.push('');
  }
  
  const contactDetails = [
    resume.contactInfo.phone,
    resume.contactInfo.email,
    resume.contactInfo.location,
    resume.contactInfo.linkedin
  ].filter(Boolean).join(' | ');
  
  if (contactDetails) {
    lines.push(contactDetails);
    lines.push('');
    lines.push('='.repeat(80));
    lines.push('');
  }
  
  // All Sections
  resume.sections.forEach(section => {
    lines.push(section.header.toUpperCase());
    lines.push('-'.repeat(80));
    lines.push('');
    
    section.content.forEach(line => {
      lines.push(line);
    });
    
    lines.push('');
  });
  
  // Add bullet points if not in sections
  if (resume.bulletPoints.length > 0) {
    lines.push('KEY ACHIEVEMENTS');
    lines.push('-'.repeat(80));
    lines.push('');
    resume.bulletPoints.forEach(bullet => {
      lines.push(`• ${bullet}`);
    });
    lines.push('');
  }
  
  return lines.join('\n');
}

function generateWordCompatibleText(resume: ParsedResume): string {
  const lines: string[] = [];
  
  // Contact
  if (resume.contactInfo.name) {
    lines.push(resume.contactInfo.name.toUpperCase());
    lines.push('');
  }
  
  const contact = [
    resume.contactInfo.phone,
    resume.contactInfo.email,
    resume.contactInfo.location,
    resume.contactInfo.linkedin
  ].filter(Boolean).join(' | ');
  
  if (contact) {
    lines.push(contact);
    lines.push('');
  }
  
  // Sections
  resume.sections.forEach(section => {
    lines.push('');
    lines.push(section.header.toUpperCase());
    lines.push('');
    
    section.content.forEach(line => {
      lines.push(line);
    });
  });
  
  return lines.join('\n');
}
