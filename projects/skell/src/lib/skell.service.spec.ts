import { TestBed } from '@angular/core/testing';

import { SkellService } from './skell.service';

describe('SkellService', () => {
  let service: SkellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
