import Sentiment from 'sentiment';
import { IPostSentiment, SentimentCategory } from '../models/subreddit.model';

export class SentimentService {
  private static sentimentAnalyzer = new Sentiment();

  /**
   * Analyzes a single post title string and calculates sentiment scores
   */
  public static analyzeTitle(title: string): IPostSentiment {
    try {
      const result = this.sentimentAnalyzer.analyze(title);
      
      let category: SentimentCategory = 'Neutral';
      if (result.score > 0) {
        category = 'Positive';
      } else if (result.score < 0) {
        category = 'Negative';
      }

      return {
        score: result.score,
        comparative: parseFloat(result.comparative.toFixed(3)),
        category,
        positiveWords: result.positive || [],
        negativeWords: result.negative || []
      };
    } catch (error) {
      console.error(`Error performing sentiment analysis on title "${title}":`, error);
      return {
        score: 0,
        comparative: 0,
        category: 'Neutral',
        positiveWords: [],
        negativeWords: []
      };
    }
  }
}
