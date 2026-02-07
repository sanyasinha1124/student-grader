import { TestBed } from '@angular/core/testing';

import { GradeCalulatorService } from './grade-calulator.service';

describe('GradeCalulatorService', () => {
  let service: GradeCalulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeCalulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
