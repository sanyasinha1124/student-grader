import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGradeColor]',
  standalone: true
})
export class GradeColorDirective implements OnChanges {
  @Input('appGradeColor') score: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    let color = 'black';
    if (this.score >= 90) color = '#2ecc71';      // Green
    else if (this.score >= 80) color = '#3498db'; // Blue
    else if (this.score >= 70) color = '#f1c40f'; // Yellow
    else if (this.score >= 60) color = '#e67e22'; // Orange
    else color = '#e74c3c';                       // Red
    
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }
}