export type SentimentCategory = 'Positive' | 'Neutral' | 'Negative';

export interface IPostSentiment {
  score: number;
  comparative: number;
  category: SentimentCategory;
  positiveWords: string[];
  negativeWords: string[];
}

export interface IAnalyzedPost {
  id: string;
  rank: number;
  title: string;
  author: string;
  score: number;
  numComments: number;
  upvoteRatio: number;
  redditUrl: string;
  createdUtc: number;
  sentiment: IPostSentiment;
}

export interface ISubredditVibeAnalysis {
  subreddit: string;
  totalPostsAnalyzed: number;
  overallVibe: 'Super Positive' | 'Positive' | 'Neutral' | 'Mixed / Controversial' | 'Negative';
  averageScore: number;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
  };
  topPositivePost?: IAnalyzedPost;
  topNegativePost?: IAnalyzedPost;
  posts: IAnalyzedPost[];
  fetchedAt: string;
}

export interface IPopularSubreddit {
  name: string;
  label: string;
  icon: string;
}
