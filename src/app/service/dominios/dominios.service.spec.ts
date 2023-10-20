import { TestBed } from '@angular/core/testing';

import { DominiosService } from './dominios.service';

describe('DominiosService', () => {
  let service: DominiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DominiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
