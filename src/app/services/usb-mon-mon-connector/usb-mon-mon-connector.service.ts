import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { plainToClass } from 'class-transformer';

import IUsbMonMonConnector from './usb-mon-mon-conector.service.interface';
import { Packet } from '../../model/packet';
import { AppStatus } from 'app/model/app-status';


@Injectable()
export class UsbMonMonConnector implements IUsbMonMonConnector {

  private packets_: Subject<Packet> = new Subject();
  private status_: Subject<AppStatus> = new ReplaySubject(1);

  constructor(private socket: Socket) {
    this.status_.next(AppStatus.CONNECTING);
    this.receiveStatus();
    this.receivePackets();
  }

  public getPackets_(): Observable<Packet> {
    return this.packets_
      .map((packet) => plainToClass(Packet, packet));
  }

  public getStatus_(): Observable<AppStatus> {
    return this.status_;
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
