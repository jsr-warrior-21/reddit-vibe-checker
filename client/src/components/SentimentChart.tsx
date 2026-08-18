import React from 'react';
import { ISubredditVibeAnalysis } from '../types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

interface SentimentChartProps {
  data: ISubredditVibeAnalysis;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const pieData = [
    { name: 'Positive', value: data.distribution.positive, color: '#10B981' },
    { name: 'Neutral', value: data.distribution.neutral, color: '#6366F1' },
    { name: 'Negative', value: data.distribution.negative, color: '#F43F5E' }
  ];

  const barData = data.posts.slice(0, 10).map((post) => ({
    rank: `#${post.rank}`,
    title: post.title.length > 25 ? post.title.substring(0, 25) + '...' : post.title,
    score: post.sentiment.score
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      return (
        <div className="bg-slate-900 text-white border border-slate-800 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-medium mb-1">{p.name || p.payload?.title || p.payload?.rank}</p>
          <p className="text-slate-400">
            Score: <span className="font-bold text-white">{p.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Sentiment Breakdown Pie Chart */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-850 text-base">Sentiment Distribution</h3>
          <span className="text-xs text-slate-400 font-medium">50 Hot Posts</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#475569' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 10 Posts Score Bar Chart */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-850 text-base">Sentiment Score Spectrum</h3>
          <span className="text-xs text-slate-400 font-medium">Top 10 Hot Posts</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="rank" stroke="#94A3B8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={entry.score > 0 ? '#10B981' : entry.score < 0 ? '#F43F5E' : '#6366F1'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
