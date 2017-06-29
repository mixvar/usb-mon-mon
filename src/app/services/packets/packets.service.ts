import { Injectable } from '@angular/core';

import IPacketsService from './packets.service.interface';
import IUsbMonMonConnector from '../usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { Packet } from 'app/model/packet';
import IPacketFilterService from '../packet-filter/packet-filter.service.interface';


@Injectable()
export class PacketsService implements IPacketsService {


  public filteredPacketsBuffer: Packet[] = [];

  private packetsBuffer: Packet[] = [];
  private bufferSize = 1000;

  constructor(private ummConnector: IUsbMonMonConnector,
              private filterService: IPacketFilterService) {
    ummConnector.getPackets_().subscribe(
      (packet) => this.onNewPacket(packet)
    );
    filterService.filtersChangeEvent_.subscribe(
      () => this.refilter()
    );
  }

  public clearBuffers() {
    this.packetsBuffer = [];
    this.filteredPacketsBuffer = [];
  }

  private onNewPacket(packet: Packet) {
    this.addPacketToBuffer(packet, this.packetsBuffer);

    if (this.filterService.filter(packet)) {
      this.addPacketToBuffer(packet, this.filteredPacketsBuffer);
    }
  }

  private addPacketToBuffer(packet: Packet, buffer: Packet[]) {
    if (buffer.length === this.bufferSize) {
      buffer.pop();
    }
    buffer.unshift(packet);
  }

  private refilter() {
    // #oldfashionway
    this.filteredPacketsBuffer = [];
    for (let i = 0; i < this.packetsBuffer.length; i++) {
      const packet: Packet = this.packetsBuffer[i];
      if (this.filterService.filter(packet)) {
        this.filteredPacketsBuffer.push(packet);
      }
    }
  }
}
