import { TestBed } from '@angular/core/testing';

import { BackendUserService } from './backend-user.service';

describe('BackendService', () => {
  let service: BackendUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
