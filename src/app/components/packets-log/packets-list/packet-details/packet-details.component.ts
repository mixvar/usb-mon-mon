import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Packet } from '../../../../model/packet';

@Component({
  selector: 'umm-packet-details',
  templateUrl: './packet-details.component.html',
  styleUrls: ['./packet-details.component.scss']
})
export class PacketDetailsComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public packet: Packet) { }

  ngOnInit() {
  }

}
