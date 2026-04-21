import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useResumeStore } from '../lib/store';

export function FileUpload() {
  const { setOriginalResume, originalResume, isProcessing, error } = useResumeStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;
    
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'text/plain'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a DOCX, PDF, or TXT file');
      return;
    }
    
    setOriginalResume(file);
  }, [setOriginalResume]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        1. Upload Your Resume
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : originalResume
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600">Processing your resume...</p>
          </div>
        ) : originalResume ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
            <p className="text-gray-900 font-medium mb-2">{originalResume.fileName}</p>
            <p className="text-sm text-gray-600 mb-4">
              {originalResume.bulletPoints.length} bullet points • {originalResume.sections.length} sections
            </p>
            <label className="cursor-pointer text-primary-600 hover:text-primary-700 underline">
              Choose a different file
              <input
                type="file"
                className="hidden"
                accept=".docx,.pdf,.txt"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-900 font-medium mb-2">
              Drag & drop your resume here
            </p>
            <p className="text-gray-600 mb-4">or</p>
            <label className="cursor-pointer bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Choose File
              <input
                type="file"
                className="hidden"
                accept=".docx,.pdf,.txt"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supports DOCX, PDF, or TXT (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-900 font-medium">Error processing resume</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {originalResume && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <FileText className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-medium mb-2">Resume Loaded Successfully</p>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Contact: {originalResume.contactInfo.name || 'Not detected'}</p>
                <p>• Email: {originalResume.contactInfo.email || 'Not detected'}</p>
                <p>• Sections: {originalResume.sections.map(s => s.header).join(', ') || 'None detected'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
