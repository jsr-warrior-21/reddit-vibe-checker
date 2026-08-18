export interface IRawRedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  upvote_ratio: number;
  permalink: string;
  created_utc: number;
  thumbnail?: string;
  url?: string;
  over_18?: boolean;
}

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
