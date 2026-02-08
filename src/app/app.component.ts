import { Component } from '@angular/core';
import { AddStudentComponent } from './core/components/add-student/add-student.component';
import { StudentListComponent } from './core/components/student-list/student-list.component';
import { StatsComponent } from './core/components/stats-component/stats-component.component';
import { GradeFormComponent } from "./core/components/grade-form-component/grade-form-component.component";
import { StudentService } from './shared/services/student/student.service';
import { Student } from './student.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddStudentComponent, StudentListComponent, StatsComponent, GradeFormComponent, CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  template: `
  
<!-- 
    <header>
  <h1>Student Management System</h1>
</header>

<main>
  <app-stats></app-stats>
  
  <app-add-student></app-add-student>
   <app-student-list></app-student-list>
  
  <hr>

  
</main> -->

<header class="app-header">
  <h1>ScholarSystem <span class="badge">Pro</span></h1>
</header>

<nav class="main-nav">
  <div class="nav-container">
    <div class="nav-links">
      <a routerLink="/list" routerLinkActive="active-link">
        <i class="icon-dashboard"></i> Dashboard
      </a>
      <a routerLink="/cards" routerLinkActive="active-link">
        <i class="icon-cards"></i> Card View
      </a>
      <a routerLink="/enroll" routerLinkActive="active-link">
        <i class="icon-plus"></i> New Enrollment
      </a>
    </div>
  </div>
</nav>

<main class="page-container">
  <app-stats></app-stats>

  <router-outlet></router-outlet>
</main>
  `,
  styleUrls: ['./app.component.css']
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