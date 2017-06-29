import { TestBed, inject } from '@angular/core/testing';

import { PacketFilterService } from './packet-filter.service';

describe('PacketFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacketFilterService]
    });
  });

  it('should be created', inject([PacketFilterService], (service: PacketFilterService) => {
    expect(service).toBeTruthy();
  }));
});
