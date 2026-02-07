import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GradeColorDirective } from '../../../shared/directive/grade-color-directive.directive';
import { GradeCalculatorService } from '../../../shared/services/gradeCalulator/grade-calulator.service';
import { CommonModule } from '@angular/common';
import { GradeFormComponent } from '../grade-form-component/grade-form-component.component';
import { Student } from '../../../student.model';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule, GradeColorDirective,GradeFormComponent],
  template: `
    <div class="card" [ngClass]="{'at-risk': average < 70}">
      <div class="header">
        <h3>{{ student.name }}</h3>
        <button (click)="onDelete.emit(student.id)">×</button>
      </div>
      
      <p>{{ student.email }}</p>

      <div class="progress-bg">
        <div class="progress-fill" 
             [style.width.%]="average"
             [ngStyle]="{'background-color': average < 70 ? 'red' : 'green'}">
        </div>
      </div>

      <span [appGradeColor]="average">GPA: {{ average | number:'1.2-2' }}%</span>
      
      <div class="grades-list" *ngIf="student.grades.length > 0">
         <div *ngFor="let g of student.grades">
            {{ g.subject }}: {{ g.score }} ({{ g.date | date:'shortDate' }})
         </div>
      </div>
    </div>
  `
})
export class StudentCardComponent {
  @Input() student!: Student;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onAddGrade = new EventEmitter<{ studentId: number; grade: any }>();
// This tells Angular: "When I emit, the payload IS this object."
  constructor(private calc: GradeCalculatorService) {}

  get average() {
    return this.calc.calculateAverage(this.student.grades);
  }
}