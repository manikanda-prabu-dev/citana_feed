import { TestBed } from '@angular/core/testing';

import { PublishpostService } from './publishpost.service';

describe('PublishpostService', () => {
  let service: PublishpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
