import { Component, OnInit } from '@angular/core';
import IPacketFilterService from '../../../services/packet-filter/packet-filter.service.interface';
import { Direction, EventType, UrbType } from '../../../model/packet';
import { EnumAware } from '../../../decorators/enum-aware.decorator';

@Component({
  selector: 'umm-packet-filters',
  templateUrl: './packet-filters.component.html',
  styleUrls: ['./packet-filters.component.scss']
})
@EnumAware
export class PacketFiltersComponent implements OnInit {

  constructor(public filterService: IPacketFilterService) {}

  ngOnInit() {
  }


}
