import { FeedbackType } from "./enums";

export interface Feedback {
  id: number;
  studentName?: string;
  trainerName?: string;
  courseName?: string;
  feedbackType: FeedbackType;
  rating: number;
  comments: string;
  anonymous: boolean;
  submittedAt: Date;
}