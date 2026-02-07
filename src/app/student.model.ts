// src/app/shared/models/student.model.ts

export interface Grade {
  subject: string;
  score: number;
 date?: Date; // <--- Add the '?' to make it optional
  type: 'assignment' | 'midterm' | 'final';
}

export interface Student {
  id: number;
  name: string;
  email: string;
  enrollmentDate: Date;
  grades: Grade[];
  average: number; // <--- MUST BE HERE
}