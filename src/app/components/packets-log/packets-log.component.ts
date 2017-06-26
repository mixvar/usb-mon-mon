import { Component, OnInit } from '@angular/core';

import IPacketsService from './../../services/packets/packets.service.interface';

@Component({
  selector: 'umm-packets-log',
  templateUrl: './packets-log.component.html',
  styleUrls: ['./packets-log.component.scss']
})
export class PacketsLogComponent implements OnInit {

  constructor(public packetsService: IPacketsService) { }

  ngOnInit() {
  }

}
