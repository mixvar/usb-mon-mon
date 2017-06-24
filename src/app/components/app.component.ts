import { Component, OnInit } from '@angular/core';

import IUsbMonMonConnector from '../services/usb-mon-mon-conector.service.interface';
import { Packet } from '../model/packet';
import { ServerStatus } from '../model/server-status';

@Component({
  selector: 'umm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'umm works!';
  receivedPackets: Packet[] = [];

  constructor(private usbPacketsService: IUsbMonMonConnector) {
  };

  ngOnInit(): void {
    this.usbPacketsService.packets_.subscribe(
      (packet) => this.receivedPackets.push(packet)
    );
    this.usbPacketsService.status_.subscribe(
      (status: ServerStatus) => console.warn(`server status: ${ServerStatus[status]}`)
    );
  }

}
