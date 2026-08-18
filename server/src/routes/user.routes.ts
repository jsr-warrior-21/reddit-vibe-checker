import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/submission', UserController.submitAssignment);
router.get('/submission', UserController.getSubmissions);

export default router;
