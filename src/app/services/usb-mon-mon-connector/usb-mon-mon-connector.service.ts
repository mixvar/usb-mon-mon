import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/observable/from';
import { Socket } from 'ng-socket-io';
import { plainToClass } from 'class-transformer';

import IUsbMonMonConnector from './usb-mon-mon-conector.service.interface';
import { EventType, Packet, Direction } from '../../model/packet';
import { AppStatus } from 'app/model/app-status';
import { PacketsTick } from '../../model/packets-tick';


@Injectable()
export class UsbMonMonConnector implements IUsbMonMonConnector {

  private isActive = true;
  private packets_: Subject<Packet[]> = new Subject();
  private ticks_: Subject<PacketsTick> = new Subject();

  private lastServerStatus: AppStatus;
  private appStatus_: Subject<AppStatus> = new ReplaySubject(1);

  constructor(private socket: Socket) {
    this.appStatus_.next(AppStatus.CONNECTING);
    this.receiveStatus();
    this.receivePackets();
    this.receiveTicks();
  }

  public getBufferedPackets_(): Observable<Packet[]> {
    return this.packets_
      .map((packets) => packets.map(
        (packet) => plainToClass(Packet, packet))
      );
  }

  getTicks_(): Observable<PacketsTick> {
    return this.ticks_;
  }

  public getStatus_(): Observable<AppStatus> {
    return this.appStatus_.distinctUntilChanged();
  }

  toggleActive(): void {
    if (this.lastServerStatus !== AppStatus.OK) {
      throw new Error('can not toogle state!');
    }

    const newStatus: AppStatus = (this.isActive) ? AppStatus.PAUSED : AppStatus.LISTENING;

    this.isActive = !this.isActive;
    this.appStatus_.next(newStatus);
  }

  private receiveStatus() {
    this.socket.on('status', (status: AppStatus) => {
      this.lastServerStatus = status;

      let nextAppStatus;
      if (AppStatus[status].startsWith('ERROR')) {
        nextAppStatus = status;
      } else if (status === AppStatus.OK) {
        nextAppStatus = (this.isActive) ? AppStatus.LISTENING : AppStatus.PAUSED;
      }

      this.appStatus_.next(nextAppStatus);
    });
  }

  private receivePackets() {
    this.socket.on('packets', (packets: Packet[]) => {
      if (this.isActive)
        this.packets_.next(packets);
    });
  }

  private receiveTicks() {
    this.socket.on('tick', (tick: PacketsTick) => {
      if (this.isActive) {
        this.ticks_.next(tick);
      } else {
        const emptyTick = PacketsTick.empty();
        emptyTick.timestamp = tick.timestamp;
        this.ticks_.next(emptyTick);
      }
    });
  }

}
