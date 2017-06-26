import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import IUsbMonMonConnector from './usb-mon-mon-conector.service.interface';

import { Packet } from '../../model/packet';
import { AppStatus } from 'app/model/app-status';

@Injectable()
export class UsbMonMonConnector implements IUsbMonMonConnector {

  public packets_: Subject<Packet> = new Subject();
  public status_: Subject<AppStatus> = new ReplaySubject(1);

  constructor(private socket: Socket) {
    this.status_.next(AppStatus.CONNECTING);
    this.receiveStatus();
    this.receivePackets();
  }

  private receiveStatus() {
    this.socket.on('status', (status: AppStatus) => {
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
