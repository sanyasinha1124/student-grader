import { Pipe, PipeTransform } from '@angular/core';
import { GradeCalculatorService } from '../../services/gradeCalulator/grade-calulator.service';

@Pipe({
  name: 'letterGradePipe'
})
export class LetterGradePipePipe implements PipeTransform {
  constructor(private gradeCalculator : GradeCalculatorService){}
  transform(average : number):string {
    return this.gradeCalculator.getLetterGrade(average);
  }

}
