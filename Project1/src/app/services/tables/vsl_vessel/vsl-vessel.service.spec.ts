import { TestBed } from '@angular/core/testing';

import { VslVesselService } from './vsl-vessel.service';

describe('VslVesselService', () => {
  let service: VslVesselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VslVesselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
