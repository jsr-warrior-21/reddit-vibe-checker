import { useState, useEffect } from 'react';
import { ApiService } from './services/api.service';
import { ISubredditVibeAnalysis, IPopularSubreddit } from './types';
import { SubredditSearch } from './components/SubredditSearch';
import { VibeHeader } from './components/VibeHeader';
import { VibeSummaryCard } from './components/VibeSummaryCard';
import { SentimentChart } from './components/SentimentChart';
import { PostList } from './components/PostList';
import { AlertCircle } from 'lucide-react';

export function App() {
  const [subreddit, setSubreddit] = useState<string>('technology');
  const [data, setData] = useState<ISubredditVibeAnalysis | null>(null);
  const [popularSubs, setPopularSubs] = useState<IPopularSubreddit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadPopularSubreddits();
    loadVibeCheck('technology');
  }, []);

  const loadPopularSubreddits = async () => {
    try {
      const subs = await ApiService.fetchPopularSubreddits();
      setPopularSubs(subs);
    } catch (err) {
      console.error(err);
    }
  };

  const loadVibeCheck = async (targetSub: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await ApiService.fetchSubredditVibe(targetSub);
      setData(result);
      setSubreddit(result.subreddit);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching subreddit sentiment data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-850 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Sleek Glassmorphic Navbar */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-base shadow-2xs">
              V
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">
              Subreddit Vibe Check
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Reddit NLP Engine</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Search Bar */}
        <SubredditSearch
          onSearch={(sub) => loadVibeCheck(sub)}
          isLoading={isLoading}
          popularSubreddits={popularSubs}
          currentSubreddit={subreddit}
        />

        {/* Error Alert */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-rose-800">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <div className="text-sm font-medium">
              <span className="font-semibold block">Unable to fetch subreddit data:</span>
              {error}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && !data && (
          <div className="max-w-3xl mx-auto py-24 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-brand-600 rounded-full animate-spin mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">Analyzing Subreddit Feed...</h3>
            <p className="text-xs text-slate-400">Processing top 50 hot post titles</p>
          </div>
        )}

        {/* Dashboard Content */}
        {data && (
          <div>
            {/* Subreddit Header */}
            <VibeHeader
              data={data}
              onRefresh={() => loadVibeCheck(data.subreddit)}
              isLoading={isLoading}
            />

            {/* Testimonials & Vibe Summary */}
            <VibeSummaryCard data={data} />

            {/* Visual Charts */}
            <SentimentChart data={data} />

            {/* Posts Feed */}
            <PostList posts={data.posts} />
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200/60 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span>Subreddit Vibe Check</span>
          <a href="https://reddit.com/dev/api" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
            Reddit API
          </a>
        </div>
      </footer>
    </div>
  );
}
