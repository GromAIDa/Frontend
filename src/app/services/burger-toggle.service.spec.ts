import { TestBed } from '@angular/core/testing';

import { BurgerToggleService } from './burger-toggle.service';

describe('BurgerToggleService', () => {
  let service: BurgerToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
