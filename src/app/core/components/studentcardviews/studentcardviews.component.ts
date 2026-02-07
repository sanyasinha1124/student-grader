import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../shared/services/student/student.service';

@Component({
  selector: 'app-student-cards-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-grid">
      <div class="student-profile-card" *ngFor="let s of studentService.students$ | async">
        <div class="card-header">
          <div class="avatar">{{ s.name.charAt(0) }}</div>
          <div class="info">
            <h4>{{ s.name }}</h4>
            <p>{{ s.email }}</p>
          </div>
        </div>
        
        <div class="grade-section">
          <h5>Subject Performance</h5>
          <div class="subject-row" *ngFor="let g of s.grades">
            <span>{{ g.subject }}</span>
            <div class="progress-bar">
              <div class="fill" [style.width.%]="g.score"></div>
            </div>
            <span class="score">{{ g.score }}%</span>
          </div>
        </div>

        <div class="card-footer">
          <span class="label">Overall Average</span>
          <span class="value">{{ s.average }}%</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./studentcardviews.component.css']
})

export class StudentcardviewsComponent {
constructor(public studentService: StudentService) {}
}
