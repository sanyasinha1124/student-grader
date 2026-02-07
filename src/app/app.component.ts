import { Component } from '@angular/core';
import { AddStudentComponent } from './core/components/add-student/add-student.component';
import { StudentListComponent } from './core/components/student-list/student-list.component';
import { StatsComponent } from './core/components/stats-component/stats-component.component';
import { GradeFormComponent } from "./core/components/grade-form-component/grade-form-component.component";
import { StudentService } from './shared/services/student/student.service';
import { Student } from './student.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddStudentComponent, StudentListComponent, StatsComponent, GradeFormComponent, CommonModule],
  template: `
    <!-- <header><h1>Student Management System</h1></header>
    <main>
      <app-stats></app-stats>
      <app-add-student></app-add-student>
      <app-student-list></app-student-list>

      <app-grade-form (onAdd)="onAddGrade.emit({ studentId: student.id, grade: $event })">
</app-grade-form>
    </main> -->

    <header>
  <h1>Student Management System</h1>
</header>

<main>
  <app-stats></app-stats>
  
  <app-add-student></app-add-student>
   <app-student-list></app-student-list>
  
  <hr>

  <section *ngIf="(studentService.students$ | async) as studentList">
  <div *ngFor="let student of studentList">
    <app-grade-form 
      (onAdd)="studentService.addGrade(student.id, $any($event))">
    </app-grade-form>
  </div>
</section>
</main>
  `
})
export class AppComponent {
  student: Student[] = [];

onAddGrade: any;
  constructor(public studentService: StudentService) {}

  // Add this method to handle the event
  handleAddGrade(event: { studentId: number; grade: any }) {
    this.studentService.addGrade(event.studentId, event.grade);
  }
}