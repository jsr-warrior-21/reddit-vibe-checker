import { Request, Response, NextFunction } from 'express';
import { RedditService } from '../services/reddit.service';

export class SubredditController {
  /**
   * GET /api/subreddit/:name/hot
   * Fetches top 50 hot posts of specified subreddit and returns sentiment vibe check analysis
   */
  public static async getSubredditVibeCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subredditName = req.params.name;
      if (!subredditName) {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Subreddit name parameter is required.'
        });
        return;
      }

      const vibeAnalysis = await RedditService.getSubredditHotPosts(subredditName);

      res.status(200).json({
        success: true,
        data: vibeAnalysis
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/subreddit/popular
   * Returns list of recommended subreddits for quick selection
   */
  public static async getPopularSubreddits(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const popular = [
        { name: 'technology', label: 'Technology', icon: 'Cpu' },
        { name: 'javascript', label: 'JavaScript', icon: 'Code' },
        { name: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
        { name: 'science', label: 'Science', icon: 'Atom' },
        { name: 'askreddit', label: 'AskReddit', icon: 'HelpCircle' },
        { name: 'wallstreetbets', label: 'WallStreetBets', icon: 'TrendingUp' },
        { name: 'programming', label: 'Programming', icon: 'Terminal' }
      ];

      res.status(200).json({
        success: true,
        data: popular
      });
    } catch (error) {
      next(error);
    }
  }
}
