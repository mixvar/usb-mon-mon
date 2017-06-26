import { Component, Input } from '@angular/core';

import { Packet } from '../../../model/packet';
import { Direction } from 'app/model/packet';

@Component({
  selector: 'umm-packet',
  templateUrl: './packet.component.html',
  styleUrls: ['./packet.component.scss']
})
export class PacketComponent {

  @Input()
  packet: Packet;

  constructor() {
  }

  getDirection(packet: Packet): string {
    return Direction[packet.parsedData.direction];
  }

}
