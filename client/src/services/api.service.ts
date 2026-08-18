import { ISubredditVibeAnalysis, IPopularSubreddit } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export class ApiService {
  /**
   * Fetches Vibe Check sentiment data for a target subreddit
   */
  public static async fetchSubredditVibe(subreddit: string): Promise<ISubredditVibeAnalysis> {
    try {
      const cleanSub = subreddit.trim().replace(/^r\//i, '');
      const response = await fetch(`${API_BASE_URL}/subreddit/${cleanSub}/hot`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch data for r/${cleanSub} (HTTP ${response.status})`);
      }

      const json = await response.json();
      if (!json.success || !json.data) {
        throw new Error(json.message || 'Invalid API response format.');
      }

      return json.data as ISubredditVibeAnalysis;
    } catch (error) {
      console.error(`[ApiService] Error fetching r/${subreddit}:`, error);
      throw error;
    }
  }

  /**
   * Fetches list of recommended/popular subreddits
   */
  public static async fetchPopularSubreddits(): Promise<IPopularSubreddit[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/subreddit/popular`);
      if (!response.ok) {
        throw new Error('Failed to fetch popular subreddits');
      }
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('[ApiService] Error fetching popular subreddits:', error);
      // Fallback
      return [
        { name: 'technology', label: 'Technology', icon: 'Cpu' },
        { name: 'javascript', label: 'JavaScript', icon: 'Code' },
        { name: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
        { name: 'science', label: 'Science', icon: 'Atom' },
        { name: 'askreddit', label: 'AskReddit', icon: 'HelpCircle' }
      ];
    }
  }

  /**
   * Submits candidate project details per Step 3 requirement
   */
  public static async submitCandidateAssignment(payload: {
    redditUsername: string;
    emailUsed: string;
    projectLink: string;
    sourceCodeLink: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || 'Failed to submit assignment');
      }

      return {
        success: true,
        message: json.message || 'Submission saved successfully!'
      };
    } catch (error) {
      console.error('[ApiService] Error submitting assignment:', error);
      throw error;
    }
  }
}
