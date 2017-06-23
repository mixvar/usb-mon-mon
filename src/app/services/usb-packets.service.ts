import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Socket} from 'ng-socket-io';

import IUsbPacketsService from './usb-packets.service.interface';


@Injectable()
export class UsbPacketsService implements IUsbPacketsService {

  packetsObs: Subject<string> = new Subject();

  constructor(private socket: Socket) {
    this.receiveMessages();
  }

  public greetServer(): void {
    this.socket.emit('message', 'hello server!');
  }

  private receiveMessages() {
    this.socket.on('message', (message) =>
      this.packetsObs.next(message));
  }

}
