import { Component, Input } from '@angular/core';

import { Packet, Direction, EventType, UrbType } from 'app/model/packet';

@Component({
  selector: 'umm-packet',
  templateUrl: './packet.component.html',
  styleUrls: ['./packet.component.scss']
})
export class PacketComponent {

  @Input()
  packet: Packet;

  constructor() { }

  getDirection(packet: Packet): string {
    return Direction[packet.parsedData.direction];
  }

  getEventType(packet: Packet): string {
    return EventType[packet.parsedData.eventType];
  }

  getUrbType(packet: Packet): string {
    return UrbType[packet.parsedData.urbType];
  }
}
