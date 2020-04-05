import { TestBed } from '@angular/core/testing';

import { HelpRequestService } from './help-request.service';

describe('HelpRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpRequestService = TestBed.get(HelpRequestService);
    expect(service).toBeTruthy();
  });
});
