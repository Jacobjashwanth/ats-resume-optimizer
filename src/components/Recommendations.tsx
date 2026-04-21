import type { Recommendation } from '../types';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-primary-600" />
        Top {recommendations.length} Recommended Fixes
      </h3>
      
      <div className="bg-gradient-to-r from-primary-50 to-indigo-50 border border-primary-200 rounded-lg p-6 mb-4">
        <p className="text-gray-700 mb-2">
          <strong>Quick Wins:</strong> These fixes will give you the biggest score improvements.
          Start with Priority #1 for maximum impact.
        </p>
        <p className="text-sm text-gray-600">
          Completing all recommendations could bring your score to <strong>{recommendations[recommendations.length - 1]?.projectedScore || 0}/100</strong>
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.priority}
            className="bg-white border-2 border-primary-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  {rec.priority}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{rec.issue}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      rec.severity === 'CRITICAL' 
                        ? 'bg-red-100 text-red-800' 
                        : rec.severity === 'WARNING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.severity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600 font-bold text-xl">
                  <span className="text-gray-600 text-sm mr-2">Score:</span>
                  {rec.currentScore}
                  <ArrowRight className="w-4 h-4 mx-2" />
                  {rec.projectedScore}
                </div>
                <p className="text-sm text-green-600 font-medium">
                  +{rec.improvement} points
                </p>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
              <p className="text-sm text-gray-800">
                <strong className="text-primary-900">How to fix:</strong> {rec.fix}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Current: {rec.currentScore}/100</span>
                <span>After fix: {rec.projectedScore}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-gray-400"
                    style={{ width: `${rec.currentScore}%` }}
                  />
                  <div
                    className="bg-green-500"
                    style={{ width: `${rec.improvement}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
