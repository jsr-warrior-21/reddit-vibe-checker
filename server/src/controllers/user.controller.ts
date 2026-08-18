import { Request, Response, NextFunction } from 'express';
import { UserModel, IUserSubmission } from '../models/user.model';

export class UserController {
  /**
   * POST /api/user/submission
   * Submits candidate details per Step 3 requirement
   */
  public static async submitAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { redditUsername, emailUsed, projectLink, sourceCodeLink } = req.body;

      if (!redditUsername || !emailUsed || !projectLink || !sourceCodeLink) {
        res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'All fields (redditUsername, emailUsed, projectLink, sourceCodeLink) are required.'
        });
        return;
      }

      const submissionData: IUserSubmission = {
        redditUsername: String(redditUsername).trim(),
        emailUsed: String(emailUsed).trim(),
        projectLink: String(projectLink).trim(),
        sourceCodeLink: String(sourceCodeLink).trim()
      };

      const result = await UserModel.createSubmission(submissionData);

      res.status(201).json({
        success: true,
        message: 'Assignment submission details recorded successfully.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/user/submission
   * Retrieves all candidate submissions
   */
  public static async getSubmissions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const submissions = await UserModel.getAllSubmissions();
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      next(error);
    }
  }
}
