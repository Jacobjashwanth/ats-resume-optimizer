import type { Issue } from '../types';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  const getSeverityIcon = (severity: Issue['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'MINOR':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity: Issue['severity']) => {
    const styles = {
      CRITICAL: 'bg-red-100 text-red-800 border-red-200',
      WARNING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      MINOR: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[severity]}`}>
        {severity}
      </span>
    );
  };

  const groupedIssues = {
    CRITICAL: issues.filter(i => i.severity === 'CRITICAL'),
    WARNING: issues.filter(i => i.severity === 'WARNING'),
    MINOR: issues.filter(i => i.severity === 'MINOR')
  };

  return (
    <div className="space-y-6">
      {/* Critical Issues */}
      {groupedIssues.CRITICAL.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Critical Issues ({groupedIssues.CRITICAL.length})
          </h4>
          <div className="space-y-3">
            {groupedIssues.CRITICAL.map((issue, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start flex-1">
                    {getSeverityIcon(issue.severity)}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-red-900">{issue.category}</h5>
                        <span className="text-red-700 font-semibold">-{issue.pointsDeducted} pts</span>
                      </div>
                      <p className="text-red-800 mb-2">{issue.description}</p>
                      <div className="bg-red-100 border-l-4 border-red-600 p-3 rounded">
                        <p className="text-sm text-red-900">
                          <strong>Fix:</strong> {issue.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {groupedIssues.WARNING.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Warnings ({groupedIssues.WARNING.length})
          </h4>
          <div className="space-y-3">
            {groupedIssues.WARNING.map((issue, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start flex-1">
                    {getSeverityIcon(issue.severity)}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-yellow-900">{issue.category}</h5>
                        <span className="text-yellow-700 font-semibold">-{issue.pointsDeducted} pts</span>
                      </div>
                      <p className="text-yellow-800 mb-2">{issue.description}</p>
                      <div className="bg-yellow-100 border-l-4 border-yellow-600 p-3 rounded">
                        <p className="text-sm text-yellow-900">
                          <strong>Fix:</strong> {issue.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Minor Issues */}
      {groupedIssues.MINOR.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Minor Issues ({groupedIssues.MINOR.length})
          </h4>
          <div className="space-y-3">
            {groupedIssues.MINOR.map((issue, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start flex-1">
                    {getSeverityIcon(issue.severity)}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-900">{issue.category}</h5>
                        <span className="text-blue-700 font-semibold">-{issue.pointsDeducted} pts</span>
                      </div>
                      <p className="text-blue-800 mb-2">{issue.description}</p>
                      <div className="bg-blue-100 border-l-4 border-blue-600 p-3 rounded">
                        <p className="text-sm text-blue-900">
                          <strong>Fix:</strong> {issue.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
