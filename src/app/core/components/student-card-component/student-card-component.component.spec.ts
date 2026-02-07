import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardComponentComponent } from './student-card-component.component';

describe('StudentCardComponentComponent', () => {
  let component: StudentCardComponentComponent;
  let fixture: ComponentFixture<StudentCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
