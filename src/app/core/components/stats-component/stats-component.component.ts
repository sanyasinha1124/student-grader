import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../shared/services/student/student.service';
import { Student } from '../../../student.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-page" *ngIf="(service.students$ | async) as list">
      <header class="stats-header">
        <h2>Class Analytics Dashboard</h2>
        <p>Real-time performance data for {{ list.length }} students</p>
      </header>

      <div class="stats-grid">
        <div class="stats-card highlight">
          <h3>Class Overview</h3>
          <div class="stat-row">
            <span>Average Score</span>
            <span class="value">{{ getClassAverage(list) }}%</span>
          </div>
          <div class="stat-row">
            <span>Total Enrollment</span>
            <span class="value">{{ list.length }}</span>
          </div>
        </div>

        <div class="stats-card performer-top" *ngIf="getTopPerformer(list) as top">
          <h3>🏆 Top Performer</h3>
          <p class="performer-name">{{ top.name }}</p>
          <p class="performer-score">{{ top.average }}% GPA</p>
        </div>

        <div class="stats-card performer-low" *ngIf="getBottomPerformer(list) as low">
          <h3>⚠️ Needs Support</h3>
          <p class="performer-name">{{ low.name }}</p>
          <p class="performer-score">{{ low.average }}% GPA</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-page { padding: 2rem; }
    .stats-header { margin-bottom: 2rem; }
    .stats-header h2 { color: #2c3e50; font-size: 1.8rem; margin: 0; }
    
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
      gap: 1.5rem; 
    }

    .stats-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border-top: 4px solid #bdc3c7;
    }

    .highlight { border-top-color: #3498db; }
    .performer-top { border-top-color: #27ae60; }
    .performer-low { border-top-color: #e74c3c; }

    .stat-row { 
      display: flex; 
      justify-content: space-between; 
      margin: 10px 0;
      font-weight: 500;
    }

    .value { color: #2c3e50; font-weight: 700; }
    .performer-name { font-size: 1.2rem; font-weight: bold; margin: 10px 0 0; }
    .performer-score { color: #7f8c8d; margin: 0; }
  `]
})
export class StatsComponent {
  constructor(public service: StudentService) {}

  getClassAverage(list: Student[]): number {
    if (list.length === 0) return 0;
    const total = list.reduce((acc, s) => acc + s.average, 0);
    return Math.round(total / list.length);
  }

  getTopPerformer(list: Student[]): Student | null {
    return list.length ? list.reduce((prev, curr) => (prev.average > curr.average) ? prev : curr) : null;
  }

  getBottomPerformer(list: Student[]): Student | null {
    return list.length ? list.reduce((prev, curr) => (prev.average < curr.average) ? prev : curr) : null;
  }
}