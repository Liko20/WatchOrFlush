import { TestBed } from '@angular/core/testing';

import { SendreviewService } from './sendreview.service';

describe('SendreviewService', () => {
  let service: SendreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
