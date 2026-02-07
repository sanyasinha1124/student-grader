// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { StudentService } from '../../../shared/services/student/student.service';
// import { Student } from '../../../student.model';

// @Component({
//   selector: 'app-stats',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="stats-bar" *ngIf="(service.students$ | async) as list">
//       <p>Total Students: {{ list.length }}</p>
//       <p>Class Average: {{ getClassAverage(list) }}%</p>
//     </div>
//   `
// })
// export class StatsComponent {
//   constructor(public service: StudentService) {}
//   getClassAverage(list: Student[]) {
//     if (list.length === 0) return 0;
//     return Math.round(list.reduce((acc, s) => acc + s.average, 0) / list.length);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../../shared/services/student/student.service';
import { Student } from '../../../student.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-container" *ngIf="(service.students$ | async) as list">
      <div class="stats-card">
        <h3>Class Overview</h3>
        <p><strong>Total Students:</strong> {{ list.length }}</p>
        <p><strong>Class Average:</strong> {{ getClassAverage(list) }}%</p>
      </div>

      <div class="stats-card" *ngIf="list.length > 0">
        <h3>Performers</h3>
        <p>
          <strong>Highest:</strong> 
          {{ getTopPerformer(list)?.name }} ({{ getTopPerformer(list)?.average }}%)
        </p>
        <p>
          <strong>Lowest:</strong> 
          {{ getBottomPerformer(list)?.name }} ({{ getBottomPerformer(list)?.average }}%)
        </p>
      </div>
    </div>
  `,
  styles: [`
    .stats-container { display: flex; gap: 20px; padding: 15px; background: #f4f7f6; border-radius: 8px; }
    .stats-card { flex: 1; border-left: 4px solid #007bff; padding-left: 15px; }
    h3 { margin-top: 0; color: #333; font-size: 1.1rem; }
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
    if (list.length === 0) return null;
    // Reduce returns the student with the maximum average
    return list.reduce((prev, current) => (prev.average > current.average) ? prev : current);
  }

  getBottomPerformer(list: Student[]): Student | null {
    if (list.length === 0) return null;
    // Reduce returns the student with the minimum average
    return list.reduce((prev, current) => (prev.average < current.average) ? prev : current);
  }
}