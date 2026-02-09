import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student, Grade } from '../../../student.model';
import { StudentService } from '../../../shared/services/student/student.service';
import { LetterGradePipePipe } from '../../../shared/pipes/LetterGradePipe/letter-grade-pipe.pipe';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule, FormsModule, LetterGradePipePipe, RouterLink],
  templateUrl: './student-card-component.component.html',
  styleUrls: ['./student-card-component.component.css']
})

export class StudentCardComponent implements OnInit {
  @Input() student?: Student; 
  @Output() onDelete = new EventEmitter<number>(); 
  isEditing = false;
  isFullView = false; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // Check if student was ALREADY provided by the parent @for loop
    if (this.student) {
      this.isFullView = false; // It's a small card in a grid
      return; 
    }

    // 2. Only if 'this.student' is empty, look at the URL (Detail View mode)
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      this.isFullView = true; // It's a full-page detailed view
      
      this.studentService.students$.subscribe(students => {
        this.student = students.find(s => s.id === id);
        
        if (!this.student) {
          this.router.navigate(['/cards']);
        }
      });
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  getHealthColor(avg: number | undefined): string {
    const val = avg || 0;
    if (val >= 85) return '#2ecc71';
    if (val >= 70) return '#f1c40f';
    return '#e74c3c';
  }

  deleteThisStudent() {
    if (this.student && confirm('Permanently delete this student record?')) {
      this.studentService.deleteStudent(this.student.id);
      this.onDelete.emit(this.student.id);
      this.router.navigate(['/cards']); // Navigating back to card view
    }
  }
}