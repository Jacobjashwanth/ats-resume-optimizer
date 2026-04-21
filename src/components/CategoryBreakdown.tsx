import type { ATSScore } from '../types';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface CategoryBreakdownProps {
  categories: ATSScore['categoryScores'];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const categoryNames = {
    formatting: 'Formatting & Structure',
    content: 'Content Optimization',
    contact: 'Contact Information',
    dates: 'Dates & Consistency',
    readability: 'Readability & Parsing'
  };

  const categoryDescriptions = {
    formatting: 'Single-column layout, standard fonts, no images/tables',
    content: 'Keyword matching, action verbs, quantifiable achievements',
    contact: 'Phone, email, location, LinkedIn',
    dates: 'Consistent formatting, no gaps, chronological order',
    readability: 'Clean text extraction, logical flow, no special characters'
  };

  const getIcon = (percentage: number) => {
    if (percentage >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (percentage >= 60) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBackgroundColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-50';
    if (percentage >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([key, category]) => (
        <div
          key={key}
          className={`p-4 rounded-lg border ${
            category.percentage >= 80
              ? 'border-green-200 bg-green-50'
              : category.percentage >= 60
              ? 'border-yellow-200 bg-yellow-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              {getIcon(category.percentage)}
              <div>
                <h4 className="font-semibold text-gray-900">
                  {categoryNames[key as keyof typeof categoryNames]}
                </h4>
                <p className="text-sm text-gray-600">
                  {categoryDescriptions[key as keyof typeof categoryDescriptions]}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {category.score}/{category.maxScore}
              </p>
              <p className="text-sm text-gray-600">
                {category.percentage.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(category.percentage)} transition-all duration-500`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>

          {/* Category Issues */}
          {category.issues.length > 0 && (
            <div className="mt-3 space-y-2">
              {category.issues.map((issue, idx) => (
                <div key={idx} className="flex items-start text-sm">
                  <span className="mr-2">
                    {issue.severity === 'CRITICAL' ? '❌' : issue.severity === 'WARNING' ? '⚠️' : 'ℹ️'}
                  </span>
                  <div>
                    <span className="text-gray-700">{issue.description}</span>
                    <span className="text-gray-500"> (-{issue.pointsDeducted} pts)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
