

// //parent component

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../shared/services/student/student.service';
import { StudentCardComponent } from '../student-card-component/student-card-component.component';
import { filter } from 'rxjs';
import { FilterByNamePipe } from '../../../shared/pipes/filter-by-name/filter-by-name.pipe';
import { FormsModule } from '@angular/forms';
import { GradeCalculatorService } from '../../../shared/services/gradeCalulator/grade-calulator.service';
import { Student } from '../../../student.model';
import { LetterGradePipePipe } from '../../../shared/pipes/LetterGradePipe/letter-grade-pipe.pipe';
import { FilterByPerformancePipe } from '../../../shared/pipes/filterByPerformance/filter-by-performance.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, StudentCardComponent,FilterByPerformancePipe,FilterByNamePipe,  FormsModule,LetterGradePipePipe,RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  student: Student[] = [];
  searchTerm = '';

  constructor(
    public studentService: StudentService,
    public gradeService: GradeCalculatorService
  ) {}

  // We use the already calculated 'average' property from the student object
  // instead of re-calculating it every time the UI renders.
  getAvgColor(avg: number | undefined): string {
    const val = avg || 0;
    if (val >= 85) return '#2ecc71'; // Green
    if (val >= 70) return '#f1c40f'; // Yellow
    return '#e74c3c'; // Red
  }

  submitQuickGrade(studentId: number, subjRef: HTMLInputElement, scoreRef: HTMLInputElement) {
    const scoreVal = Number(scoreRef.value);
    
    // Simple validation
    if (subjRef.value.trim() && !isNaN(scoreVal) && scoreVal >= 0) {
      const grade = {
        subject: subjRef.value,
        score: scoreVal,
        date: new Date(),
        type: 'assignment' as const // Type cast to match your Grade interface
      };
      
      this.studentService.addGrade(studentId, grade);
      
      // Reset inputs
      subjRef.value = ''; 
      scoreRef.value = '';
    }
  }

  trackById(index: number, student: Student) { 
    return student.id; 
  }

  handleDelete(id: number) { 
    if(confirm('Are you sure?')) {
      this.studentService.deleteStudent(id); 
    }
  }
  //filter as good,bad
 
}