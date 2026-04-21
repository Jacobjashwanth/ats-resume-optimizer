import { FileText, Github } from 'lucide-react';
import { useResumeStore } from '../lib/store';

export function Header() {
  const { reset } = useResumeStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={reset}>
            <FileText className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">ATS Resume Optimizer</h1>
              <p className="text-xs text-gray-500">Beat the bots, land the interview</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/ats-resume-optimizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
