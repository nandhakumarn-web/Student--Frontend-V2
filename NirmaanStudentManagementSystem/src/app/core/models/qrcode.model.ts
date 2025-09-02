export interface QRCodeData {
  qrCodeId: string;
  qrCodeImage: string;
  validDate: string;
  expiresAt: string;
}

export interface StudentQuizAttempt {
  id: number;
  startTime: Date;
  endTime: Date;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: string;
  completed: boolean;
}