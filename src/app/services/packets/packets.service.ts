import { Injectable } from '@angular/core';

import IPacketsService from './packets.service.interface';
import IUsbMonMonConnector from '../usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { Packet } from 'app/model/packet';


@Injectable()
export class PacketsService implements IPacketsService {

  public packetsBuffer: Packet[] = [];
  private bufferSize = 500;

  constructor(private ummConnector: IUsbMonMonConnector) {
    ummConnector.packets_.subscribe(
      (packet) => this.onNewPacket(packet)
    );
  }

  public setBufferSize(newSize: number): void {
    if (newSize < this.bufferSize) {
      this.packetsBuffer = this.packetsBuffer.slice(0, this.packetsBuffer.length);
    }
    this.bufferSize = newSize;
  }

  private onNewPacket(packet: Packet) {
    if (this.packetsBuffer.length === this.bufferSize) {
      this.packetsBuffer.pop();
    }
    this.packetsBuffer.unshift(packet);
  }
}
