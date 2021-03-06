import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import IPacketsService from './../../services/packets/packets.service.interface';
import { PacketDetailsComponent } from './packets-list/packet-details/packet-details.component';
import { Packet } from '../../model/packet';
import IChartsService from '../../services/charts/charts.service.interface';

@Component({
  selector: 'umm-packets-log',
  templateUrl: './packets-log.component.html',
  styleUrls: ['./packets-log.component.scss']
})
export class PacketsLogComponent implements OnInit {

  constructor(public packetsService: IPacketsService,
              public chartService: IChartsService) { }

  ngOnInit() {
  }

}
