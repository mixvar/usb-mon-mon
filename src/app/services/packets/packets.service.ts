import { Injectable } from '@angular/core';

import IPacketsService from './packets.service.interface';
import IUsbMonMonConnector from '../usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { Packet } from "app/model/packet";


@Injectable()
export class PacketsService implements IPacketsService {

  public packetsBuffer: Packet[] = [];
  private bufferSize: number = 500;

  constructor(private ummConnector: IUsbMonMonConnector) {
    ummConnector.packets_.subscribe(
      (packet) => this.onNewPacket(packet)
    );
  }

  public setBufferSize(newSize: number): void {
    if (newSize < this.bufferSize) {
      this.packetsBuffer = this.packetsBuffer.slice(
        this.packetsBuffer.length - newSize,
        this.packetsBuffer.length
      );
    }
    this.bufferSize = newSize;
  }

  private onNewPacket(packet: Packet) {
    if (this.packetsBuffer.length === this.bufferSize) {
      this.packetsBuffer.shift();
    }
    this.packetsBuffer.push(packet);
  }
}
