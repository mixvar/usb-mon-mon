import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import IUsbMonMonConnector from './usb-mon-mon-conector.service.interface';

import { Packet } from '../model/packet';
import { ServerStatus } from "app/model/server-status";

@Injectable()
export class UsbMonMonConnector implements IUsbMonMonConnector {

  packets_: Subject<Packet> = new Subject();
  status_: Subject<ServerStatus> = new ReplaySubject(1);

  constructor(private socket: Socket) {
    this.status_.next(ServerStatus.CONNECTING);
    this.receiveStatus();
    this.receivePackets();
  }

  private receiveStatus() {
    this.socket.on('status', (status: ServerStatus) => {
      this.status_.next(status);
    });
  }

  private receivePackets() {
    this.socket.on('packet', (packet: Packet) => {
      console.debug('received packet', packet);
      this.packets_.next(packet);
    });
  }

}
