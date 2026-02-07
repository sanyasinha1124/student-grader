import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeFormComponentComponent } from './grade-form-component.component';

describe('GradeFormComponentComponent', () => {
  let component: GradeFormComponentComponent;
  let fixture: ComponentFixture<GradeFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
