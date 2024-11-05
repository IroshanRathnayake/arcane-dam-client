import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
