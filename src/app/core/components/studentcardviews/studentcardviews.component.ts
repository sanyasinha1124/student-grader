import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../shared/services/student/student.service';
import { StudentCardComponent } from '../student-card-component/student-card-component.component';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from '../../../shared/pipes/filter-by-name/filter-by-name.pipe';

@Component({
  selector: 'app-studentcardviews',
  standalone: true,
  imports: [CommonModule, StudentCardComponent,FormsModule,FilterByNamePipe],
  template: `
    <div class="cards-dashboard">
  <header class="view-header">
    <div class="header-content">
      <h2>Student Directory</h2>
      <p>Viewing {{ (studentService.students$ | async)?.length }} registered students</p>
    </div>
    
    <div class="search-wrapper">
      <input type="text" [(ngModel)]="cardSearch" placeholder="Search cards...">
    </div>
  </header>

  <div class="cards-grid">
    <!-- @for (s of (studentService.students$ | async | filterByName: cardSearch); track s.id) {
      <app-student-card 
        [student]="s"
        (onDelete)="handleDelete($event)">
      </app-student-card>
    } -->

    @for (s of (studentService.students$| async); track s.id) {
  <app-student-card [student]="s"></app-student-card> }
    
    @empty {
      <div class="empty-state">
        <div class="icon">📁</div>
        <h3>No students found</h3>
        <p>Try adjusting your search or enroll a new student.</p>
      </div>
    }
  </div>
</div>
  `,
  styleUrls: ['./studentcardviews.component.css']
})
export class StudentcardviewsComponent {
  
  // Add this property to store the search text
  cardSearch: string = '';
  constructor(public studentService: StudentService) {}

  handleDelete(id: number) {
    if(confirm('Are you sure you want to remove this student?')) {
      this.studentService.deleteStudent(id);
    }
  }
}