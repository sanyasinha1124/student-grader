import { Component, Input } from '@angular/core';
import { StudentService } from '../../../shared/services/student/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="grade-inputs">
      <input [(ngModel)]="subject" placeholder="Subj">
      <input type="number" [(ngModel)]="score" placeholder="Score">
      <button (click)="submit()">+</button>
    </div>
  `
})
export class GradeFormComponent {
  @Input() studentId!: number;
  subject = ''; score = 0;
  constructor(private service: StudentService) {}
  submit() {
    this.service.addGrade(this.studentId, {
      subject: this.subject, score: this.score,
      date: undefined,
      type: 'assignment'
    });
  }
}