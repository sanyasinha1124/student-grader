// import { Pipe, PipeTransform } from '@angular/core';
// import { Student } from '../../../student.model';
// import { GradeCalculatorService } from '../../services/gradeCalulator/grade-calulator.service';

// @Pipe({
//   name: 'filterByPerformance',
//   standalone: true
// })
// export class FilterByPerformancePipe implements PipeTransform {

//   constructor(private gradeCalculator: GradeCalculatorService) { }


//   transform(students: Student[], performanceL: string): Student[] {
//     if (!students || !performanceL || performanceL === "All") return students;

//     return students.filter(s => {
//       // Logic based on your GradeCalculator average
//       const avg = this.gradeCalculator.calculateAverage(s.grades);
//       const category = this.gradeCalculator.getPerformanceCategory(avg);
//       return category === performanceL;
//     });
//   };
// }

import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../../student.model';
import { GradeCalculatorService } from '../../services/gradeCalulator/grade-calulator.service';

@Pipe({
  name: 'filterByPerformance',
  standalone: true
})
export class FilterByPerformancePipe implements PipeTransform {
  constructor(private gradeCalculator: GradeCalculatorService) {}

  transform(students: Student[] | null, performanceLabel: string): Student[] {
    if (!students) return [];
    if (!performanceLabel || performanceLabel === 'All') return students;

    return students.filter(s => {
      // Get the category string (e.g., 'Excellent', 'Poor') from your service
      const category = this.gradeCalculator.getPerformanceCategory(s.average);
      return category.toLowerCase() === performanceLabel.toLowerCase();
    });
  }
}