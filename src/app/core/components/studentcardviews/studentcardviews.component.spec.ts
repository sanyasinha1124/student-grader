import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcardviewsComponent } from './studentcardviews.component';

describe('StudentcardviewsComponent', () => {
  let component: StudentcardviewsComponent;
  let fixture: ComponentFixture<StudentcardviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentcardviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentcardviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
