import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

import IUsbPacketsService from './usb-packets.service.interface';
import { Packet } from '../model/packet';

@Injectable()
export class UsbPacketsService implements IUsbPacketsService {

  packets_: Subject<Packet> = new Subject();

  constructor(private socket: Socket) {
    this.receiveGreetings();
    this.receivePackets();
  }

  public greetServer(): void {
    this.socket.emit('greeting', 'hello server!');
  }

  private receiveGreetings() {
    this.socket.on('greeting', (message) =>
      console.log(`received greeting from server: '${message}'`));
  }

  private receivePackets() {
    this.socket.on('packet', (packet) => {
      console.debug('received packet', packet);
      this.packets_.next(packet);
    });
  }

}
