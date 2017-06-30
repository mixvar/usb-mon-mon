import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Packet } from '../../../model/packet';
import { PacketDetailsComponent } from './packet-details/packet-details.component';


@Component({
  selector: 'umm-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrls: ['./packets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacketsListComponent implements OnInit {

  @Input()
  public packets: Packet[];

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  showPacketDetails(packet: Packet) {
    this.dialog.open(PacketDetailsComponent, {
      data: packet,
      panelClass: 'packetDetailsDialog',
    });
  }
}
