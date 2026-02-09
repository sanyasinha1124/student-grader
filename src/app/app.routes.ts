import { Routes } from '@angular/router';
import { AddStudentComponent } from './core/components/add-student/add-student.component';
import { StudentListComponent } from './core/components/student-list/student-list.component';

import { StudentCardComponent } from './core/components/student-card-component/student-card-component.component';
import { StudentcardviewsComponent } from './core/components/studentcardviews/studentcardviews.component';
import { StatsComponent } from './core/components/stats-component/stats-component.component';

export const routes: Routes = [
  // When the user clicks "Card View", load the VIEW/GRID component
  { path: 'cards', component: StudentcardviewsComponent}, 
  
  // When a user clicks an individual student's
  { path: 'student/:id', component: StudentCardComponent },
   { path: 'enroll', component: AddStudentComponent },
  { path: 'list', component: StudentListComponent },
   { path: 'stats', component: StatsComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

