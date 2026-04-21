import { FileUpload } from './components/FileUpload';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ScoreDashboard } from './components/ScoreDashboard';
import { Header } from './components/Header';
import { useResumeStore } from './lib/store';
import { FileText } from 'lucide-react';

function App() {
  const { originalResume, atsScore } = useResumeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary-500 rounded-full">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ATS Resume Optimizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your resume past Applicant Tracking Systems. Upload your resume, 
            paste a job description, and get instant ATS compatibility scoring with 
            actionable improvements.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FileUpload />
          <JobDescriptionInput />
        </div>

        {/* Score Dashboard */}
        {originalResume && atsScore && (
          <div className="mt-8">
            <ScoreDashboard />
          </div>
        )}

        {/* Features */}
        {!originalResume && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                📊 Instant ATS Scoring
              </h3>
              <p className="text-gray-600">
                Get a 0-100 score across 5 categories: Formatting, Content, 
                Contact Info, Dates, and Readability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                🎯 Keyword Matching
              </h3>
              <p className="text-gray-600">
                See exactly which keywords from the job description are missing 
                from your resume and get suggestions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ✅ Actionable Fixes
              </h3>
              <p className="text-gray-600">
                Every issue comes with a clear fix and impact score, so you know 
                exactly what to improve first.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">
            <strong>100% Privacy:</strong> All processing happens in your browser. 
            Your resume never leaves your device.
          </p>
          <p className="text-sm">
            ATS Resume Optimizer - Built for job seekers, by people who understand ATS systems
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
