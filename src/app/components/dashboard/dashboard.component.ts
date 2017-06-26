import { Component, OnInit } from '@angular/core';

import IPacketsService from './../../services/packets/packets.service.interface';
import { Packet } from '../../model/packet';

@Component({
  selector: 'umm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      public packetsService: IPacketsService,
  ) { }

  ngOnInit() {
  }

}
