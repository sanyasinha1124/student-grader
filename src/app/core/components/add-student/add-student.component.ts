import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../shared/services/student/student.service';
@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  template: `
   <div class="card">
  <h3>Enroll New Student</h3>
  
  <div class="input-group">
    <label for="studentName">Full Name</label>
    <input id="studentName" [(ngModel)]="name" placeholder="e.g. John Doe">
  </div>

  <div class="input-group">
    <label for="studentEmail">Email Address</label>
    <input id="studentEmail" [(ngModel)]="email" type="email" placeholder="john@example.com">
  </div>

  <button (click)="save()">
    <span>Confirm Enrollment</span>
  </button>
</div>
  `,
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  name = ''; email = '';
  constructor(private service: StudentService) {}
  save() {
    if (this.name && this.email) {
      this.service.addStudent(this.name, this.email);
      this.name = ''; this.email = '';
    }
  }
}
