import { create } from 'zustand';
import type { ParsedResume, ATSScore } from '../types';
import { ResumeParser } from '../lib/parser';
import { calculateATSScore } from '../lib/scorer';

interface ResumeState {
  originalResume: ParsedResume | null;
  jobDescription: string;
  atsScore: ATSScore | null;
  isProcessing: boolean;
  error: string | null;
  
  setOriginalResume: (file: File) => Promise<void>;
  setJobDescription: (jd: string) => void;
  calculateScore: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  originalResume: null,
  jobDescription: '',
  atsScore: null,
  isProcessing: false,
  error: null,
  
  setOriginalResume: async (file: File) => {
    set({ isProcessing: true, error: null });
    
    try {
      const parser = new ResumeParser();
      const resume = await parser.parse(file);
      set({ originalResume: resume, isProcessing: false });
      get().calculateScore();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to parse resume',
        isProcessing: false 
      });
    }
  },
  
  setJobDescription: (jd: string) => {
    set({ jobDescription: jd });
    if (get().originalResume) {
      get().calculateScore();
    }
  },
  
  calculateScore: () => {
    const { originalResume, jobDescription } = get();
    if (!originalResume) return;
    
    const score = calculateATSScore(originalResume, jobDescription);
    set({ atsScore: score });
  },
  
  reset: () => {
    set({
      originalResume: null,
      jobDescription: '',
      atsScore: null,
      isProcessing: false,
      error: null
    });
  }
}));
