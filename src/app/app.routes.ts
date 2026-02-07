import { Routes } from '@angular/router';
import { AddStudentComponent } from './core/components/add-student/add-student.component';
import { StudentListComponent } from './core/components/student-list/student-list.component';
import { StudentcardviewsComponent } from './core/components/studentcardviews/studentcardviews.component';
export const routes: Routes = [
  { path: 'enroll', component: AddStudentComponent },
  { path: 'list', component: StudentListComponent },
  { path: 'cards', component: StudentcardviewsComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' } // Default page is the list
];