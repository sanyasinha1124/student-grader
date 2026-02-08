import { Routes } from '@angular/router';
import { AddStudentComponent } from './core/components/add-student/add-student.component';
import { StudentListComponent } from './core/components/student-list/student-list.component';
import { StudentcardviewsComponent } from './core/components/studentcardviews/studentcardviews.component';
import { StudentCardComponent } from './core/components/student-card-component/student-card-component.component';
export const routes: Routes = [
  { path: 'list', component: StudentListComponent },
  { path: 'student/:id', component: StudentCardComponent }, // New dynamic route
  { path: 'enroll', component: AddStudentComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];