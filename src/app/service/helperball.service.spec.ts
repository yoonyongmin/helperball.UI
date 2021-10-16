import { TestBed } from '@angular/core/testing';

import { HelperballService } from './helperball.service';

describe('HelperballService', () => {
  let service: HelperballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
