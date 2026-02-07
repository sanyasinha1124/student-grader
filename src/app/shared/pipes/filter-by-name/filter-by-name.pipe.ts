import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../../student.model';
@Pipe({
  name: 'filterByName',
  standalone: true // Crucial for standalone components
})
export class FilterByNamePipe implements PipeTransform {
  transform(students: Student[] | null, searchTerm: string): Student[] {
    if (!students) return [];
    if (!searchTerm) return students;

    const term = searchTerm.toLowerCase();
    return students.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.email.toLowerCase().includes(term)
    );
  }
}