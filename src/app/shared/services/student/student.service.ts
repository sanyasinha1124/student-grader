import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Student,Grade } from '../../../student.model';
import { GradeCalculatorService } from '../gradeCalulator/grade-calulator.service';
@Injectable({ providedIn: 'root' })
export class StudentService {

  private initialData: Student[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.s@university.edu',
      enrollmentDate: new Date('2025-09-01'),
      grades: [
        { subject: 'Math', score: 95, type: 'midterm', date: new Date() },
        { subject: 'Physics', score: 88, type: 'assignment', date: new Date() }
      ],
      average: 91.5 // Exemplary
    },
    {
      id: 2,
      name: 'Sarah Connor',
      email: 's.connor@cyberdyne.com',
      enrollmentDate: new Date('2025-08-15'),
      grades: [
        { subject: 'History', score: 72, type: 'assignment', date: new Date() },
        { subject: 'English', score: 78, type: 'midterm', date: new Date() }
      ],
      average: 75 // Proficient
    },
    {
      id: 3,
      name: 'Kyle Reese',
      email: 'kyle.r@resistance.org',
      enrollmentDate: new Date('2026-01-10'),
      grades: [
        { subject: 'Math', score: 45, type: 'assignment', date: new Date() },
        { subject: 'Biology', score: 52, type: 'assignment', date: new Date() }
      ],
      average: 48.5 // At Risk
    },
    {
      id: 4,
      name: 'Elena Gilbert',
      email: 'elena.g@mysticfalls.edu',
      enrollmentDate: new Date('2025-11-20'),
      grades: [
        { subject: 'Art', score: 65, type: 'assignment', date: new Date() },
        { subject: 'Literature', score: 68, type: 'midterm', date: new Date() }
      ],
      average: 66.5 // Developing
    }
  ];

  // private students = new BehaviorSubject<Student[]>([]);
  private students = new BehaviorSubject<Student[]>(this.initialData);
  students$ = this.students.asObservable();
   
  // FIX: Inject GradeCalculatorService here
  constructor(private calcService: GradeCalculatorService) {}

 // student.service.ts

addStudent(name: string, email: string) {
  const newStudent: Student = {
    id: Date.now(),
    name: name,
    email: email,
    enrollmentDate: new Date(), // Adding the date automatically
    grades: [],
    average: 0
  };
  const currentStudents = this.students.value; 
  this.students.next([...currentStudents, newStudent]);
  // const newList = [...this.students.value, newStudent];
  // this.students.next(newList);
}

  deleteStudent(id: number) {
    this.students.next(this.students.value.filter(s => s.id !== id));
  }

  // inside student.service.ts
addGrade(studentId: number, grade: Grade) {
  const updatedList = this.students.value.map(s => {
    if (s.id === studentId) {
      const newGrades = [...s.grades, grade];
      // We must calculate and return the average here so it exists on the object
      const newAverage = this.calcService.calculateAverage(newGrades);
      
      return { 
        ...s, 
        grades: newGrades, 
        average: newAverage // <--- Data is now attached to the Student object
      };
    }
    return s;
  });
  this.students.next(updatedList);
}
}