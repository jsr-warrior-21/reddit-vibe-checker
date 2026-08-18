import React from 'react';
import { ISubredditVibeAnalysis } from '../types';
import { ExternalLink, RotateCw } from 'lucide-react';

interface VibeHeaderProps {
  data: ISubredditVibeAnalysis;
  onRefresh: () => void;
  isLoading: boolean;
}

export const VibeHeader: React.FC<VibeHeaderProps> = ({ data, onRefresh, isLoading }) => {
  const getVibeBadgeStyle = (vibe: string) => {
    switch (vibe) {
      case 'Super Positive':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Positive':
        return 'bg-teal-50 text-teal-700 border-teal-200/80';
      case 'Neutral':
        return 'bg-slate-100 text-slate-700 border-slate-200/80';
      case 'Mixed / Controversial':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Negative':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  const getVibeEmoji = (vibe: string) => {
    switch (vibe) {
      case 'Super Positive': return '🔥';
      case 'Positive': return '😊';
      case 'Neutral': return '😐';
      case 'Mixed / Controversial': return '🥊';
      case 'Negative': return '😞';
      default: return '✨';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 tracking-tight">
            r/{data.subreddit}
          </h1>
          <a
            href={`https://reddit.com/r/${data.subreddit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-600 transition-colors p-1"
            title="Open in Reddit"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
          <span>Analyzed {data.totalPostsAnalyzed} Hot Posts</span>
          <span>•</span>
          <span>Updated {new Date(data.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-bold shadow-2xs ${getVibeBadgeStyle(data.overallVibe)}`}>
          <span>{getVibeEmoji(data.overallVibe)}</span>
          <span className="tracking-wide">{data.overallVibe}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 rounded-full transition-all duration-150 cursor-pointer disabled:opacity-50"
          title="Refresh Vibe Check"
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
