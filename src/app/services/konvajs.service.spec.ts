import { TestBed } from '@angular/core/testing';

import { KonvajsService } from './konvajs.service';

describe('KonvajsService', () => {
  let service: KonvajsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonvajsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
