import { TestBed } from '@angular/core/testing';

import { RequestorLoginService } from './requestor-login.service';

describe('RequestorLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestorLoginService = TestBed.get(RequestorLoginService);
    expect(service).toBeTruthy();
  });
});
