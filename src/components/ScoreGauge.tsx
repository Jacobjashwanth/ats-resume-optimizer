interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getBackgroundColor = (score: number) => {
    if (score >= 80) return '#d1fae5';
    if (score >= 60) return '#fef3c7';
    return '#fee2e2';
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex justify-center">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="70"
            stroke={getBackgroundColor(score)}
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="70"
            stroke={getColor(score)}
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
