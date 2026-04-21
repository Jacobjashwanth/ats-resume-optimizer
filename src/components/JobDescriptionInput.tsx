import { useState } from 'react';
import { Briefcase, AlertCircle } from 'lucide-react';
import { useResumeStore } from '../lib/store';

export function JobDescriptionInput() {
  const { jobDescription, setJobDescription, originalResume } = useResumeStore();
  const [localValue, setLocalValue] = useState(jobDescription);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    setJobDescription(value);
  };

  const wordCount = localValue.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        2. Paste Job Description
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={localValue}
            onChange={handleChange}
            placeholder="Paste the full job description here...

Example:
Software Engineer - Full Stack
Required Skills: JavaScript, React, Node.js, Python, SQL, AWS
3+ years building scalable web applications..."
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none resize-none"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {wordCount} words
          </div>
        </div>

        {!originalResume && localValue.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900 font-medium">Upload resume first</p>
              <p className="text-amber-700 text-sm mt-1">
                Upload your resume in step 1 to see how it matches this job description
              </p>
            </div>
          </div>
        )}

        {localValue.length > 0 && originalResume && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-900 font-medium">Job Description Loaded</p>
                <p className="text-green-700 text-sm mt-1">
                  Your resume is being analyzed against this job description. 
                  Scroll down to see your ATS compatibility score.
                </p>
              </div>
            </div>
          </div>
        )}

        {localValue.length === 0 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 text-sm">
              <strong>Tip:</strong> Including a job description helps identify missing keywords 
              and improves the accuracy of your ATS score. You can also use this tool without 
              a job description for general ATS compatibility analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
