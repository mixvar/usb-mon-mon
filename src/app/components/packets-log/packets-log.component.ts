import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import IPacketsService from './../../services/packets/packets.service.interface';
import { PacketDetailsComponent } from './packet-details/packet-details.component';
import { Packet } from '../../model/packet';

@Component({
  selector: 'umm-packets-log',
  templateUrl: './packets-log.component.html',
  styleUrls: ['./packets-log.component.scss']
})
export class PacketsLogComponent implements OnInit {

  constructor(public packetsService: IPacketsService,
              public dialog: MdDialog) { }

  ngOnInit() {
  }

  showPacketDetails(packet: Packet) {
    this.dialog.open(PacketDetailsComponent, {
      data: packet,
      height: '600px',
      width: '800px',
    });
  }

}
