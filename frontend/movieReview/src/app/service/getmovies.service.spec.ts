import { TestBed } from '@angular/core/testing';

import { GetmoviesService } from './getmovies.service';

describe('GetmoviesService', () => {
  let service: GetmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
