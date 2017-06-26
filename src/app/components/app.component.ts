import { Component, OnInit } from '@angular/core';

import IUsbMonMonConnector from '../services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import IPacketsService from '../services/packets/packets.service.interface';
import { Packet } from '../model/packet';
import { AppStatus } from '../model/app-status';

@Component({
  selector: 'umm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'usb-mon-mon';

  constructor(
    private ummConnector: IUsbMonMonConnector,
    public packetsService: IPacketsService,
  ) { };

  ngOnInit(): void {
    this.ummConnector.status_.subscribe(
      (status: AppStatus) => console.warn(`server status: ${AppStatus[status]}`)
    );
  }

}
