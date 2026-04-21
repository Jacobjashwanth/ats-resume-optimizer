import type { 
  ParsedResume, 
  ATSScore, 
  CategoryScore, 
  Issue, 
  Recommendation,
  KeywordAnalysis,
  KeywordMatch
} from '../types';

export function calculateATSScore(
  parsedResume: ParsedResume, 
  jobDescription: string
): ATSScore {
  const startTime = Date.now();
  
  const formattingScore = calculateFormattingScore(parsedResume);
  const contentScore = calculateContentScore(parsedResume, jobDescription);
  const contactScore = calculateContactScore(parsedResume);
  const dateScore = calculateDateConsistencyScore(parsedResume);
  const readabilityScore = calculateReadabilityScore(parsedResume);
  
  const totalScore = 
    formattingScore.score +
    contentScore.score +
    contactScore.score +
    dateScore.score +
    readabilityScore.score;
  
  const allIssues = [
    ...formattingScore.issues,
    ...contentScore.issues,
    ...contactScore.issues,
    ...dateScore.issues,
    ...readabilityScore.issues
  ].sort((a, b) => {
    const severityOrder = { 'CRITICAL': 0, 'WARNING': 1, 'MINOR': 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return b.impactOnScore - a.impactOnScore;
  });
  
  const recommendations = generateRecommendations(allIssues, totalScore);
  const processingTime = Date.now() - startTime;
  
  return {
    totalScore,
    maxScore: 100,
    percentage: totalScore,
    categoryScores: {
      formatting: formattingScore,
      content: contentScore,
      contact: contactScore,
      dates: dateScore,
      readability: readabilityScore
    },
    issues: allIssues,
    recommendations,
    metadata: {
      calculatedAt: new Date(),
      processingTime,
      resumeHash: generateHash(parsedResume.fullText)
    }
  };
}

function calculateFormattingScore(parsedResume: ParsedResume): CategoryScore {
  const scores = {
    standardHeaders: 0,
    noTables: 5,
    noHeaderFooter: 3,
    noImages: 0,
    standardFont: 3,
    appropriateFontSize: 2,
    simpleBullets: 3,
    standardFormat: 0
  };
  
  const issues: Issue[] = [];
  
  // Check for standard section headers
  const requiredSections = ['experience', 'education', 'skills'];
  const sectionHeaders = parsedResume.sections.map(s => s.header.toLowerCase());
  
  let foundSections = 0;
  requiredSections.forEach(section => {
    if (sectionHeaders.some(h => h.includes(section))) {
      foundSections++;
    }
  });
  
  if (foundSections === 3) {
    scores.standardHeaders = 5;
  } else if (foundSections === 2) {
    scores.standardHeaders = 3;
    issues.push({
      category: 'Formatting',
      severity: 'WARNING',
      description: 'Missing standard section headers',
      pointsDeducted: 2,
      fix: 'Add standard headers: Experience, Education, Skills',
      impactOnScore: 2
    });
  } else {
    scores.standardHeaders = 0;
    issues.push({
      category: 'Formatting',
      severity: 'CRITICAL',
      description: 'Non-standard section organization',
      pointsDeducted: 5,
      fix: 'Reorganize into standard sections with clear headers',
      impactOnScore: 5
    });
  }
  
  // Check for images
  if (parsedResume.images && parsedResume.images.length > 0) {
    scores.noImages = 0;
    issues.push({
      category: 'Formatting',
      severity: 'CRITICAL',
      description: `${parsedResume.images.length} image(s) detected`,
      pointsDeducted: 4,
      fix: 'Remove all images and graphics',
      impactOnScore: 4
    });
  } else {
    scores.noImages = 4;
  }
  
  // Check file format
  if (parsedResume.fileType === 'docx') {
    scores.standardFormat = 5;
  } else if (parsedResume.fileType === 'pdf') {
    scores.standardFormat = 3;
    issues.push({
      category: 'Formatting',
      severity: 'MINOR',
      description: 'PDF format is less ATS-friendly than DOCX',
      pointsDeducted: 2,
      fix: 'Convert to DOCX format for best ATS compatibility',
      impactOnScore: 2
    });
  } else {
    scores.standardFormat = 2;
  }
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return {
    score: totalScore,
    maxScore: 30,
    percentage: (totalScore / 30) * 100,
    subScores: scores,
    issues
  };
}

function calculateContentScore(
  parsedResume: ParsedResume, 
  jobDescription: string
): CategoryScore {
  const scores = {
    keywordMatch: 0,
    actionVerbs: 0,
    quantifiableAchievements: 0,
    noErrors: 5,
    appropriateLength: 0
  };
  
  const issues: Issue[] = [];
  
  // Keyword matching
  const keywordAnalysis = analyzeKeywords(parsedResume.fullText, jobDescription);
  const matchPercentage = keywordAnalysis.matchRate;
  
  if (matchPercentage >= 90) scores.keywordMatch = 15;
  else if (matchPercentage >= 80) scores.keywordMatch = 13;
  else if (matchPercentage >= 70) scores.keywordMatch = 11;
  else if (matchPercentage >= 60) scores.keywordMatch = 9;
  else if (matchPercentage >= 50) scores.keywordMatch = 7;
  else if (matchPercentage >= 40) scores.keywordMatch = 5;
  else if (matchPercentage >= 30) scores.keywordMatch = 3;
  else scores.keywordMatch = 1;
  
  if (matchPercentage < 70) {
    issues.push({
      category: 'Content',
      severity: matchPercentage < 50 ? 'CRITICAL' : 'WARNING',
      description: `Keyword match rate: ${matchPercentage.toFixed(1)}%`,
      pointsDeducted: 15 - scores.keywordMatch,
      fix: `Add missing keywords: ${keywordAnalysis.missingKeywords.slice(0, 5).join(', ')}`,
      impactOnScore: 15 - scores.keywordMatch
    });
  }
  
  // Action verbs
  const actionVerbPercentage = analyzeActionVerbs(parsedResume.bulletPoints);
  
  if (actionVerbPercentage >= 80) {
    scores.actionVerbs = 5;
  } else if (actionVerbPercentage >= 60) {
    scores.actionVerbs = 3;
    issues.push({
      category: 'Content',
      severity: 'WARNING',
      description: `Only ${actionVerbPercentage.toFixed(0)}% of bullets start with action verbs`,
      pointsDeducted: 2,
      fix: 'Start bullet points with strong action verbs',
      impactOnScore: 2
    });
  } else {
    scores.actionVerbs = 1;
    issues.push({
      category: 'Content',
      severity: 'CRITICAL',
      description: `Only ${actionVerbPercentage.toFixed(0)}% of bullets start with action verbs`,
      pointsDeducted: 4,
      fix: 'Rewrite bullets to start with action verbs (Led, Developed, Implemented)',
      impactOnScore: 4
    });
  }
  
  // Metrics detection
  const metricsPercentage = detectMetrics(parsedResume.bulletPoints);
  
  if (metricsPercentage >= 60) {
    scores.quantifiableAchievements = 5;
  } else if (metricsPercentage >= 40) {
    scores.quantifiableAchievements = 3;
    issues.push({
      category: 'Content',
      severity: 'WARNING',
      description: `Only ${metricsPercentage.toFixed(0)}% of bullets contain metrics`,
      pointsDeducted: 2,
      fix: 'Add quantifiable metrics to achievement bullets',
      impactOnScore: 2
    });
  } else {
    scores.quantifiableAchievements = 1;
    issues.push({
      category: 'Content',
      severity: 'CRITICAL',
      description: `Only ${metricsPercentage.toFixed(0)}% of bullets contain metrics`,
      pointsDeducted: 4,
      fix: 'Add specific numbers, percentages, or quantifiable results',
      impactOnScore: 4
    });
  }
  
  // Length check
  const wordCount = parsedResume.fullText.split(/\s+/).length;
  const pageCount = Math.ceil(wordCount / 500);
  
  if (pageCount >= 1 && pageCount <= 2) {
    scores.appropriateLength = 5;
  } else if (pageCount < 1) {
    scores.appropriateLength = 2;
    issues.push({
      category: 'Content',
      severity: 'WARNING',
      description: 'Resume appears too short (< 1 page)',
      pointsDeducted: 3,
      fix: 'Expand with more detailed achievements',
      impactOnScore: 3
    });
  } else {
    scores.appropriateLength = 2;
    issues.push({
      category: 'Content',
      severity: 'WARNING',
      description: `Resume is ${pageCount} pages (recommend 1-2)`,
      pointsDeducted: 3,
      fix: 'Condense to 1-2 pages, focus on most relevant experience',
      impactOnScore: 3
    });
  }
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return {
    score: totalScore,
    maxScore: 35,
    percentage: (totalScore / 35) * 100,
    subScores: scores,
    issues
  };
}

function calculateContactScore(parsedResume: ParsedResume): CategoryScore {
  const scores = {
    phoneNumber: 0,
    email: 0,
    linkedin: 0,
    location: 0
  };
  
  const issues: Issue[] = [];
  const contact = parsedResume.contactInfo;
  
  if (contact.phone) {
    scores.phoneNumber = 3;
  } else {
    issues.push({
      category: 'Contact',
      severity: 'CRITICAL',
      description: 'No phone number found',
      pointsDeducted: 3,
      fix: 'Add phone number in standard format',
      impactOnScore: 3
    });
  }
  
  if (contact.email) {
    scores.email = 3;
  } else {
    issues.push({
      category: 'Contact',
      severity: 'CRITICAL',
      description: 'No email address found',
      pointsDeducted: 3,
      fix: 'Add professional email address',
      impactOnScore: 3
    });
  }
  
  if (contact.linkedin) {
    scores.linkedin = 2;
  }
  
  if (contact.location) {
    scores.location = 2;
  } else {
    issues.push({
      category: 'Contact',
      severity: 'MINOR',
      description: 'No location found',
      pointsDeducted: 2,
      fix: 'Add location: City, State',
      impactOnScore: 2
    });
  }
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return {
    score: totalScore,
    maxScore: 10,
    percentage: (totalScore / 10) * 100,
    subScores: scores,
    issues
  };
}

function calculateDateConsistencyScore(_parsedResume: ParsedResume): CategoryScore {
  return {
    score: 8,
    maxScore: 10,
    percentage: 80,
    subScores: {
      consistentFormat: 5,
      noGaps: 2,
      chronologicalOrder: 1
    },
    issues: []
  };
}

function calculateReadabilityScore(parsedResume: ParsedResume): CategoryScore {
  const scores = {
    cleanExtraction: 5,
    logicalFlow: 5,
    noSpecialChars: 0
  };
  
  const issues: Issue[] = [];
  
  // Check for special characters
  const problematicChars = ['@', '#', '%', '&', '<', '>', '§', '†', '‡', '©', '®', '™'];
  const foundChars: string[] = [];
  
  problematicChars.forEach(char => {
    if (parsedResume.fullText.includes(char)) {
      // Exclude @ in email addresses
      if (char === '@' && parsedResume.contactInfo.email) {
        return;
      }
      foundChars.push(char);
    }
  });
  
  if (foundChars.length === 0) {
    scores.noSpecialChars = 5;
  } else if (foundChars.length <= 3) {
    scores.noSpecialChars = 3;
    issues.push({
      category: 'Readability',
      severity: 'WARNING',
      description: `Special characters detected: ${foundChars.join(', ')}`,
      pointsDeducted: 2,
      fix: 'Replace special characters with standard text',
      impactOnScore: 2
    });
  } else {
    scores.noSpecialChars = 0;
    issues.push({
      category: 'Readability',
      severity: 'CRITICAL',
      description: `${foundChars.length} problematic special characters`,
      pointsDeducted: 5,
      fix: 'Remove or replace all special characters',
      impactOnScore: 5
    });
  }
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return {
    score: totalScore,
    maxScore: 15,
    percentage: (totalScore / 15) * 100,
    subScores: scores,
    issues
  };
}

function analyzeKeywords(resumeText: string, jobDescription: string): KeywordAnalysis {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return {
      matchRate: 0,
      totalKeywords: 0,
      matchedKeywords: 0,
      matches: [],
      missingKeywords: [],
      suggestions: []
    };
  }
  
  const keywords = extractKeywords(jobDescription);
  const resumeLower = resumeText.toLowerCase();
  
  let matchedCount = 0;
  const matches: KeywordMatch[] = [];
  const missing: string[] = [];
  
  keywords.forEach(keyword => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matchedCount++;
      matches.push({
        keyword,
        context: '',
        matchType: 'exact',
        weight: 1
      });
    } else {
      missing.push(keyword);
    }
  });
  
  const matchRate = keywords.length > 0 ? (matchedCount / keywords.length) * 100 : 0;
  
  return {
    matchRate,
    totalKeywords: keywords.length,
    matchedKeywords: matchedCount,
    matches,
    missingKeywords: missing,
    suggestions: missing.slice(0, 10)
  };
}

function extractKeywords(text: string): string[] {
  const commonTechSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS',
    'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'TypeScript',
    'Angular', 'Vue', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'
  ];
  
  const found: string[] = [];
  const textLower = text.toLowerCase();
  
  commonTechSkills.forEach(skill => {
    if (textLower.includes(skill.toLowerCase())) {
      found.push(skill);
    }
  });
  
  // Also extract capitalized words (likely skills/technologies)
  const capitalizedWords = text.match(/\b[A-Z][a-z]+(?:\.[a-z]+)*\b/g) || [];
  capitalizedWords.forEach(word => {
    if (word.length > 3 && !found.includes(word)) {
      found.push(word);
    }
  });
  
  return [...new Set(found)].slice(0, 20);
}

function analyzeActionVerbs(bulletPoints: string[]): number {
  if (bulletPoints.length === 0) return 0;
  
  const strongVerbs = [
    'achieved', 'led', 'developed', 'implemented', 'managed', 'increased',
    'decreased', 'improved', 'created', 'designed', 'built', 'launched',
    'established', 'streamlined', 'optimized', 'drove', 'spearheaded'
  ];
  
  let count = 0;
  bulletPoints.forEach(bullet => {
    const firstWord = bullet.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
    if (strongVerbs.includes(firstWord)) {
      count++;
    }
  });
  
  return (count / bulletPoints.length) * 100;
}

function detectMetrics(bulletPoints: string[]): number {
  if (bulletPoints.length === 0) return 0;
  
  const metricPatterns = [
    /\d+%/,
    /\$[\d,]+/,
    /\d+[KkMmBb]/,
    /\d+\+/,
    /\d+x/,
    /\b\d+\s*(users|customers|clients|people|employees|hours|days|months|years)\b/i,
  ];
  
  let count = 0;
  bulletPoints.forEach(bullet => {
    const hasMetric = metricPatterns.some(pattern => pattern.test(bullet));
    if (hasMetric) count++;
  });
  
  return (count / bulletPoints.length) * 100;
}

function generateRecommendations(issues: Issue[], currentScore: number): Recommendation[] {
  const topIssues = issues
    .sort((a, b) => b.impactOnScore - a.impactOnScore)
    .slice(0, 5);
  
  return topIssues.map((issue, index) => ({
    priority: index + 1,
    issue: issue.description,
    fix: issue.fix,
    currentScore,
    projectedScore: currentScore + issue.impactOnScore,
    improvement: issue.impactOnScore,
    severity: issue.severity
  }));
}

function generateHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
