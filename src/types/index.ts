// Core Types for ATS Resume Optimizer

export interface ParsedResume {
  fullText: string;
  fileType: 'docx' | 'pdf' | 'txt';
  fileName: string;
  sections: Section[];
  bulletPoints: string[];
  contactInfo: ContactInfo;
  textBlocks?: TextBlock[];
  rawXML?: string;
  images?: Image[];
}

export interface Section {
  header: string;
  content: string[];
  startLine: number;
}

export interface ContactInfo {
  name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  linkedin: string | null;
  website: string | null;
}

export interface TextBlock {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Image {
  data: string;
  type: string;
}

export interface ATSScore {
  totalScore: number;
  maxScore: number;
  percentage: number;
  categoryScores: {
    formatting: CategoryScore;
    content: CategoryScore;
    contact: CategoryScore;
    dates: CategoryScore;
    readability: CategoryScore;
  };
  issues: Issue[];
  recommendations: Recommendation[];
  metadata: {
    calculatedAt: Date;
    processingTime: number;
    resumeHash: string;
  };
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  percentage: number;
  subScores: Record<string, number>;
  issues: Issue[];
}

export interface Issue {
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'MINOR';
  description: string;
  pointsDeducted: number;
  fix: string;
  impactOnScore: number;
}

export interface Recommendation {
  priority: number;
  issue: string;
  fix: string;
  currentScore: number;
  projectedScore: number;
  improvement: number;
  severity: 'CRITICAL' | 'WARNING' | 'MINOR';
}

export interface KeywordAnalysis {
  matchRate: number;
  totalKeywords: number;
  matchedKeywords: number;
  matches: KeywordMatch[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface KeywordMatch {
  keyword: string;
  context: string;
  matchType: 'exact' | 'synonym' | 'fuzzy';
  weight: number;
}

export interface OptimizedResumeResult {
  files: {
    docx: Blob;
    txt: Blob;
  };
  scores: {
    original: ATSScore;
    optimized: ATSScore;
    improvement: number;
  };
  transformations: string[];
  metadata: {
    processingTime: number;
    originalWordCount: number;
    optimizedWordCount: number;
  };
}

export interface LayoutAnalysis {
  hasTables: boolean;
  tableCount: number;
  hasColumns: boolean;
  columnCount: number;
  hasTextBoxes: boolean;
  textBoxCount: number;
  hasImages: boolean;
  imageCount: number;
}

export interface ActionVerbAnalysis {
  totalBullets: number;
  bulletsWithActionVerbs: number;
  bulletsWithoutActionVerbs: string[];
  weakVerbs: Array<{
    original: string;
    weakVerb: string;
    suggestions: string[];
  }>;
  percentage: number;
  score: number;
}

export interface MetricsAnalysis {
  totalBullets: number;
  bulletsWithMetrics: number;
  metricsFound: Array<{
    bullet: string;
    metrics: string[];
  }>;
  bulletsWithoutMetrics: string[];
  percentage: number;
  score: number;
}
