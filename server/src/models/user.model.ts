export interface IUserSubmission {
  redditUsername: string;
  emailUsed: string;
  projectLink: string;
  sourceCodeLink: string;
  submittedAt?: Date;
}

export class UserModel {
  private static submissions: IUserSubmission[] = [];

  public static async createSubmission(submissionData: IUserSubmission): Promise<IUserSubmission> {
    const newSubmission: IUserSubmission = {
      ...submissionData,
      submittedAt: new Date()
    };
    this.submissions.push(newSubmission);
    return newSubmission;
  }

  public static async getAllSubmissions(): Promise<IUserSubmission[]> {
    return this.submissions;
  }
}
