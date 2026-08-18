import React from 'react';
import { ISubredditVibeAnalysis } from '../types';
import { Quote, ThumbsUp, ArrowUpRight } from 'lucide-react';

interface VibeSummaryCardProps {
  data: ISubredditVibeAnalysis;
}

export const VibeSummaryCard: React.FC<VibeSummaryCardProps> = ({ data }) => {
  const { distribution, topPositivePost, topNegativePost } = data;

  return (
    <div className="space-y-8 mb-10">
      {/* 3 Minimal Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Positive Stat */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Positive Ratio</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-850 tracking-tight">{distribution.positivePercentage}%</span>
            <span className="text-xs font-medium text-slate-400">({distribution.positive} posts)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${distribution.positivePercentage}%` }}
            />
          </div>
        </div>

        {/* Neutral Stat */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Neutral Ratio</span>
            <span className="w-2 h-2 rounded-full bg-brand-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-850 tracking-tight">{distribution.neutralPercentage}%</span>
            <span className="text-xs font-medium text-slate-400">({distribution.neutral} posts)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${distribution.neutralPercentage}%` }}
            />
          </div>
        </div>

        {/* Negative Stat */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">Negative Ratio</span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-850 tracking-tight">{distribution.negativePercentage}%</span>
            <span className="text-xs font-medium text-slate-400">({distribution.negative} posts)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${distribution.negativePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Editorial Quote Showcases ("Testimonials of Subreddit Sentiment") */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Positive Showcase */}
        {topPositivePost && (
          <div className="relative bg-gradient-to-b from-emerald-50/40 to-white border border-emerald-200/70 rounded-2xl p-7 shadow-subtle flex flex-col justify-between group hover:shadow-md transition-all">
            <Quote className="absolute right-6 top-6 w-12 h-12 text-emerald-500/10 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Highest Sentiment Title
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  +{topPositivePost.sentiment.score} Score
                </span>
              </div>
              <p className="text-slate-850 font-medium text-base sm:text-lg leading-relaxed mb-6 italic">
                "{topPositivePost.title}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-200/40 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {topPositivePost.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-slate-700">u/{topPositivePost.author}</span>
              </div>
              <a
                href={topPositivePost.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span>{topPositivePost.score.toLocaleString()} upvotes</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Top Critical Showcase */}
        {topNegativePost && (
          <div className="relative bg-gradient-to-b from-rose-50/40 to-white border border-rose-200/70 rounded-2xl p-7 shadow-subtle flex flex-col justify-between group hover:shadow-md transition-all">
            <Quote className="absolute right-6 top-6 w-12 h-12 text-rose-500/10 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/60 px-2.5 py-1 rounded-full border border-rose-200/60">
                  Most Critical Title
                </span>
                <span className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-full border border-rose-200 shadow-2xs">
                  {topNegativePost.sentiment.score} Score
                </span>
              </div>
              <p className="text-slate-850 font-medium text-base sm:text-lg leading-relaxed mb-6 italic">
                "{topNegativePost.title}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-rose-200/40 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {topNegativePost.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-slate-700">u/{topNegativePost.author}</span>
              </div>
              <a
                href={topNegativePost.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-rose-700 hover:text-rose-800 transition-colors"
              >
                <span>{topNegativePost.score.toLocaleString()} upvotes</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
