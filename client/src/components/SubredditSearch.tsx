import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { IPopularSubreddit } from '../types';

interface SubredditSearchProps {
  onSearch: (subreddit: string) => void;
  isLoading: boolean;
  popularSubreddits: IPopularSubreddit[];
  currentSubreddit: string;
}

export const SubredditSearch: React.FC<SubredditSearchProps> = ({
  onSearch,
  isLoading,
  popularSubreddits,
  currentSubreddit
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleQuickSelect = (subName: string) => {
    setInputVal(subName);
    onSearch(subName);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white border border-slate-200/80 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 rounded-full p-2 transition-all duration-200 shadow-subtle hover:shadow-md">
          <div className="pl-5 pr-2 text-slate-400 focus-within:text-brand-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-slate-400 font-medium text-base pr-0.5">r/</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="technology, gaming, javascript..."
            className="w-full bg-transparent text-slate-850 text-base font-medium placeholder-slate-400 focus:outline-none py-2.5 pr-4"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="flex items-center gap-2 bg-slate-900 hover:bg-brand-600 disabled:bg-slate-100 disabled:text-slate-300 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Select Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        <span className="text-xs font-semibold text-slate-400 mr-1">Popular:</span>
        {popularSubreddits.map((item) => {
          const isActive = currentSubreddit.toLowerCase() === item.name.toLowerCase();
          return (
            <button
              key={item.name}
              onClick={() => handleQuickSelect(item.name)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:text-slate-900 shadow-2xs'
              }`}
            >
              r/{item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
