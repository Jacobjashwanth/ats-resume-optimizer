import { Download, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { generateOptimizedResume } from '../lib/generator';
import { useResumeStore } from '../lib/store';

export function ResumeGenerator() {
  const { originalResume, jobDescription, atsScore } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!originalResume || !atsScore) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateOptimizedResume(originalResume, jobDescription);
      
      // Download DOCX
      const docxBlob = new Blob([result.docx], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      const docxUrl = URL.createObjectURL(docxBlob);
      const docxLink = document.createElement('a');
      docxLink.href = docxUrl;
      docxLink.download = 'resume-ats-optimized.docx';
      docxLink.click();
      
      // Download TXT
      const txtBlob = new Blob([result.txt], { type: 'text/plain' });
      const txtUrl = URL.createObjectURL(txtBlob);
      const txtLink = document.createElement('a');
      txtLink.href = txtUrl;
      txtLink.download = 'resume-ats-optimized.txt';
      txtLink.click();
      
      alert(`✅ Success! Downloaded 2 files:\n• resume-ats-optimized.docx\n• resume-ats-optimized.txt\n\nProjected Score: ${result.projectedScore}/100`);
      
    } catch (error) {
      alert('Error generating resume. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mt-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Generate ATS-Optimized Resume
          </h3>
          <p className="text-gray-700 mb-4">
            Create a professionally formatted, ATS-friendly version of your resume that fixes all detected issues.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Single-column layout (no tables/columns)</li>
              <li>✅ Standard fonts (Arial/Calibri)</li>
              <li>✅ No images or graphics</li>
              <li>✅ Optimized keywords from job description</li>
              <li>✅ Clean formatting for ATS parsing</li>
              <li>✅ 2 formats: DOCX + Plain Text</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Generate & Download
                </>
              )}
            </button>
            
            {atsScore.totalScore < 80 && (
              <div className="text-sm text-gray-600">
                <strong>Projected Score:</strong> 85-95/100
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}