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
  // student?: Student;
  @Input() student?: Student; // Add this line!
  @Output() onDelete = new EventEmitter<number>(); // Add this to notify parent of deletions
  isEditing = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  // ngOnInit() {
  //   // Grab the ID from the URL (e.g., /student/1)
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
    
  //   this.studentService.students$.subscribe(students => {
  //     this.student = students.find(s => s.id === id);
  //     // If student not found, redirect back to list
  //     if (!this.student && id) {
  //       this.router.navigate(['/list']);
  //     }
  //   });
  // }
  ngOnInit() {
  // 1. Check if student was ALREADY provided by the parent @for loop
  if (this.student) {
    return; // Stop here! Don't look at the URL.
  }

  // 2. Only if 'this.student' is empty, look at the URL (Detail View mode)
  const id = Number(this.route.snapshot.paramMap.get('id'));
  
  if (id) {
    this.studentService.students$.subscribe(students => {
      this.student = students.find(s => s.id === id);
      
      if (!this.student) {
        this.router.navigate(['/cards']); // Updated to go back to cards
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
    if (confirm('Permanently delete this student record?')) {
      this.studentService.deleteStudent(this.student!.id);
      this.router.navigate(['/list']);
    }
  }
}