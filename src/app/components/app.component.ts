import { Component, OnInit } from '@angular/core';
import IUsbPacketsService from '../services/usb-packets.service.interface';

@Component({
  selector: 'umm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'umm works!';
  receivedPackets: string[] = [];

  constructor(private usbPacketsService: IUsbPacketsService) {
  };

  ngOnInit(): void {
    this.usbPacketsService.greetServer();
    this.usbPacketsService.packetsObs.subscribe(
      (packet) => this.receivedPackets.push(packet)
    );
  }

}
