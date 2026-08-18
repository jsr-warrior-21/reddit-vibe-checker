import { Router } from 'express';
import { SubredditController } from '../controllers/subreddit.controller';

const router = Router();

router.get('/popular', SubredditController.getPopularSubreddits);
router.get('/:name/hot', SubredditController.getSubredditVibeCheck);

export default router;
