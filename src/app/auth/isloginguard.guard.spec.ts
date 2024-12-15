import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloginguardGuard } from './isloginguard.guard';

describe('isloginguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloginguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
