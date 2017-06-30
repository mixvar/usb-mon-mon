import { Component, OnInit } from '@angular/core';

import IUsbMonMonConnector from '../../services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { AppStatus } from '../../model/app-status';
import IPacketsService from '../../services/packets/packets.service.interface';


@Component({
  selector: 'umm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appStatus: string;
  toggleEnabled: boolean;
  listening = false;

  constructor(private ummConnector: IUsbMonMonConnector,
              private packetsService: IPacketsService) { }

  ngOnInit() {
    this.ummConnector.getStatus_().subscribe(
      (status: AppStatus) => {
        this.appStatus = AppStatus[status];
        switch (status) {
          case AppStatus.LISTENING:
            this.toggleEnabled = true;
            this.listening = true;
            break;
          case AppStatus.PAUSED:
            this.toggleEnabled = true;
            this.listening = false;
            break;
          default:
            this.toggleEnabled = false;
            this.listening = false;
        }
      }
    );
  }

  toggleListening() {
    this.ummConnector.toggleActive();
  }

  clearData() {
    this.packetsService.clearBuffers();
  }

}
