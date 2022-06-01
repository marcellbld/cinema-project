import { TestBed } from '@angular/core/testing';

import { ScreeningService } from './screening.service';

xdescribe('ScreeningService', () => {
  let service: ScreeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
