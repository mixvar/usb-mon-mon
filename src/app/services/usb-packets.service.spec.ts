import { TestBed, inject } from '@angular/core/testing';

import { UsbPacketsService } from './usb-packets.service';

describe('UsbPacketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsbPacketsService]
    });
  });

  it('should be created', inject([UsbPacketsService], (service: UsbPacketsService) => {
    expect(service).toBeTruthy();
  }));
});
