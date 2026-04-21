import { TrendingUp } from 'lucide-react';
import { useResumeStore } from '../lib/store';
import { CategoryBreakdown } from './CategoryBreakdown';
import { IssuesList } from './IssuesList';
import { Recommendations } from './Recommendations';
import { ResumeGenerator } from './ResumeGenerator';
import { ScoreGauge } from './ScoreGauge';

export function ScoreDashboard() {
  const { atsScore } = useResumeStore();

  if (!atsScore) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRating = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-8 h-8 text-primary-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">
          Your ATS Compatibility Score
        </h2>
      </div>

      {/* Overall Score */}
      <div className="mb-8">
        <ScoreGauge score={atsScore.totalScore} />
        <div className="text-center mt-6">
          <p className={`text-5xl font-bold ${getScoreColor(atsScore.totalScore)}`}>
            {atsScore.totalScore}/100
          </p>
          <p className="text-xl text-gray-600 mt-2">
            {getScoreRating(atsScore.totalScore)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Processed in {atsScore.metadata.processingTime}ms
          </p>
        </div>
      </div>

      {/* What This Means */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">What does this score mean?</h3>
        <div className="text-blue-800 text-sm space-y-2">
          {atsScore.totalScore >= 80 && (
            <p>
              ✅ Your resume has excellent ATS compatibility! It should pass through most 
              Applicant Tracking Systems without issues. Minor improvements can make it even better.
            </p>
          )}
          {atsScore.totalScore >= 60 && atsScore.totalScore < 80 && (
            <p>
              ⚠️ Your resume has good ATS compatibility but needs some improvements. 
              Focus on the critical issues below to increase your chances of passing ATS screening.
            </p>
          )}
          {atsScore.totalScore < 60 && (
            <p>
              ❌ Your resume may struggle with ATS systems. Several critical issues need to be fixed 
              to improve your chances. Review the recommendations below and prioritize the high-impact fixes.
            </p>
          )}
        </div>
      </div>

      {/* Resume Generator - NEW! */}
      <ResumeGenerator />

      {/* Category Breakdown */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Score Breakdown by Category
        </h3>
        <CategoryBreakdown categories={atsScore.categoryScores} />
      </div>

      {/* Top Recommendations */}
      {atsScore.recommendations.length > 0 && (
        <div className="mb-8">
          <Recommendations recommendations={atsScore.recommendations} />
        </div>
      )}

      {/* All Issues */}
      {atsScore.issues.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            All Issues Found ({atsScore.issues.length})
          </h3>
          <IssuesList issues={atsScore.issues} />
        </div>
      )}

      {atsScore.issues.length === 0 && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-900 font-medium text-lg">
            🎉 Perfect! No issues found with your resume.
          </p>
          <p className="text-green-700 text-sm mt-2">
            Your resume follows ATS best practices and should perform well in automated screening.
          </p>
        </div>
      )}
    </div>
  );
}