import { TestBed } from '@angular/core/testing';

import { GetuserdataService } from './getuserdata.service';

describe('GetuserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetuserdataService = TestBed.get(GetuserdataService);
    expect(service).toBeTruthy();
  });
});
