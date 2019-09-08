import { TestBed } from '@angular/core/testing';

import { BippieService } from './bippie.service';

describe('BippieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BippieService = TestBed.get(BippieService);
    expect(service).toBeTruthy();
  });
});
