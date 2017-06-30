import { Component, Input } from '@angular/core';

import { Packet } from '../../../../model/packet';

@Component({
  selector: 'umm-packet',
  templateUrl: './packet.component.html',
  styleUrls: ['./packet.component.scss']
})
export class PacketComponent {

  @Input()
  packet: Packet;

  Packet: Packet = new Packet();

  constructor() { }
}
