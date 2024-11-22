import { TestBed } from '@angular/core/testing';

import { RightSidebarService } from './right-sidebar.service';

describe('RightSidebarService', () => {
  let service: RightSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
