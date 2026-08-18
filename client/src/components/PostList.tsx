import React, { useState, useMemo } from 'react';
import { IAnalyzedPost, SentimentCategory } from '../types';
import { ArrowUpRight, ArrowUpDown, MessageSquare, ThumbsUp } from 'lucide-react';

interface PostListProps {
  posts: IAnalyzedPost[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [categoryFilter, setCategoryFilter] = useState<'All' | SentimentCategory>('All');
  const [sortBy, setSortBy] = useState<'rank' | 'highest_sentiment' | 'lowest_sentiment' | 'upvotes'>('rank');

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Filter
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.sentiment.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'highest_sentiment') return b.sentiment.score - a.sentiment.score;
      if (sortBy === 'lowest_sentiment') return a.sentiment.score - b.sentiment.score;
      if (sortBy === 'upvotes') return b.score - a.score;
      return 0;
    });

    return result;
  }, [posts, categoryFilter, sortBy]);

  const getBadgeStyle = (cat: SentimentCategory) => {
    switch (cat) {
      case 'Positive': return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Neutral': return 'bg-brand-50 text-brand-700 border-brand-200/80';
      case 'Negative': return 'bg-rose-50 text-rose-700 border-rose-200/80';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-subtle">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Positive', 'Neutral', 'Negative'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 text-slate-850 text-xs font-medium border border-slate-200/80 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="rank">Hot Rank (#1 to #50)</option>
            <option value="highest_sentiment">Highest Sentiment Score</option>
            <option value="lowest_sentiment">Lowest Sentiment Score</option>
            <option value="upvotes">Most Upvotes</option>
          </select>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="divide-y divide-slate-100">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No posts match the selected filter.
          </div>
        ) : (
          filteredAndSortedPosts.map((post) => (
            <div
              key={post.id}
              className="py-4 first:pt-0 last:pb-0 group hover:bg-slate-50/60 rounded-xl px-3 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-slate-100 text-slate-500 font-bold text-[11px] px-2 py-0.5 rounded shrink-0 mt-0.5">
                    #{post.rank}
                  </span>
                  <div>
                    <h3 className="font-medium text-slate-850 group-hover:text-brand-600 transition-colors text-sm sm:text-base leading-snug">
                      <a
                        href={post.redditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {post.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-600 shrink-0" />
                      </a>
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5 font-normal">
                      <span>u/{post.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <ThumbsUp className="w-3 h-3 text-brand-500" /> {post.score.toLocaleString()} upvotes
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {post.numComments} comments
                      </span>
                    </div>

                    {/* Sentiment Terms */}
                    {(post.sentiment.positiveWords.length > 0 || post.sentiment.negativeWords.length > 0) && (
                      <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                        {post.sentiment.positiveWords.map((w, i) => (
                          <span key={`p-${i}`} className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200/50">
                            +{w}
                          </span>
                        ))}
                        {post.sentiment.negativeWords.map((w, i) => (
                          <span key={`n-${i}`} className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-medium border border-rose-200/50">
                            -{w}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Badge */}
                <div className="flex flex-col items-end shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(post.sentiment.category)}`}>
                    {post.sentiment.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1">
                    Score: {post.sentiment.score > 0 ? `+${post.sentiment.score}` : post.sentiment.score}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
