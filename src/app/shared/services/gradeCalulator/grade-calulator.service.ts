// import { Injectable } from '@angular/core';
// import { Grade } from '../../../student.model';

// @Injectable({ providedIn: 'root' })
// export class GradeCalculatorService {
//   // Logic: assignments 40%, midterm 30%, final 30%
//   calculateAverage(grades: Grade[]): number {
//     if (!grades.length) return 0;
    
//     const weights = { assignment: 0.4, midterm: 0.3, final: 0.3 };
    
//     // Group grades by type and calculate averages per type
//     const types = ['assignment', 'midterm', 'final'] as const;
//     let totalScore = 0;
//     let totalWeightUsed = 0;

//     types.forEach(type => {
//       const typeGrades = grades.filter(g => g.type === type);
//       if (typeGrades.length > 0) {
//         const typeAvg = typeGrades.reduce((s, g) => s + g.score, 0) / typeGrades.length;
//         totalScore += typeAvg * weights[type];
//         totalWeightUsed += weights[type];
//       }
//     });

//     return totalWeightUsed > 0 ? totalScore / totalWeightUsed : 0;
//   }
// }

import { Injectable } from '@angular/core';
import { Grade } from '../../../student.model';

@Injectable({ providedIn: 'root' })
export class GradeCalculatorService {
  private readonly weights = { assignment: 0.4, midterm: 0.3, final: 0.3 };

  /**
   * Calculates the weighted average based on assignment, midterm, and final scores.
   */
  calculateAverage(grades: Grade[]): number {
    if (!grades || grades.length === 0) return 0;

    const types = ['assignment', 'midterm', 'final'] as const;
    let totalScore = 0;
    let totalWeightUsed = 0;

    types.forEach(type => {
      const typeGrades = grades.filter(g => g.type === type);
      if (typeGrades.length > 0) {
        const typeAvg = typeGrades.reduce((sum, g) => sum + g.score, 0) / typeGrades.length;
        totalScore += typeAvg * this.weights[type];
        totalWeightUsed += this.weights[type];
      }
    });

    const result = totalWeightUsed > 0 ? (totalScore / totalWeightUsed) : 0;
    return Math.round(result * 100) / 100; // Return rounded to 2 decimal places
  }

  /**
   * Converts a numerical average (0-100) to a Letter Grade.
   */
  getLetterGrade(average: number): string {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  }

  /**
   * Converts a numerical average to a 4.0 GPA scale.
   */
  calculateGPA(average: number): number {
    // Standard linear interpolation/scale for GPA
    if (average >= 90) return 4.0;
    if (average >= 80) return 3.0;
    if (average >= 70) return 2.0;
    if (average >= 60) return 1.0;
    return 0.0;
  }

  /**
   * Returns a performance category based on the score.
   */
  getPerformanceCategory(average: number): 'Exemplary' | 'Proficient' | 'Developing' | 'At Risk' {
    if (average >= 90) return 'Exemplary';
    if (average >= 75) return 'Proficient';
    if (average >= 60) return 'Developing';
    return 'At Risk';
  }

  /**
   * Generates a summary object for a student.
   */
  getStudentStats(grades: Grade[]) {
    const avg = this.calculateAverage(grades);
    return {
      average: avg,
      letterGrade: this.getLetterGrade(avg),
      gpa: this.calculateGPA(avg),
      status: this.getPerformanceCategory(avg),
      totalGrades: grades.length
    };
  }
}