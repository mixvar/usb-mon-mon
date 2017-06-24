import { TestBed, inject } from '@angular/core/testing';

import { UsbMonMonConnector } from './usb-mon-mon-connector.service';

describe('UsbPacketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsbMonMonConnector]
    });
  });

  it('should be created', inject([UsbMonMonConnector], (service: UsbMonMonConnector) => {
    expect(service).toBeTruthy();
  }));
});
