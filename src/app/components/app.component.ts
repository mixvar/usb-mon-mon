import {Component, OnInit} from '@angular/core';
import IUsbPacketsService from '../services/usb-packets.service.interface';

@Component({
  selector: 'umm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'umm works!';
  receivedMessages: string[] = [];

  constructor(private usbPacketsService: IUsbPacketsService) {
  };

  ngOnInit(): void {
    this.usbPacketsService.greetServer();
    this.usbPacketsService.packetsObs.subscribe(
      (message) => this.receivedMessages.push(message)
    );
  }

}
