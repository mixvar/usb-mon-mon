import { TestBed, inject } from '@angular/core/testing';

import { PacketsService } from './packets.service';

describe('PacketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacketsService]
    });
  });

  it('should be created', inject([PacketsService], (service: PacketsService) => {
    expect(service).toBeTruthy();
  }));
});
