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

  // // needed to use enums from html..
  // private Direction = {
  //   Input: Direction.Input,
  //   Output: Direction.Output,
  // };
  // private EventType = {
  //   Submission: EventType.,
  //   Callback: EventType.Callback,
  //   SubmissionError: EventType.SubmissionError,
  // };
  // private UrbType = {
  //   Control: UrbType.Control,
  //   Isochronous: UrbType.Isochronous,
  //   Interrupt: UrbType.Interrupt,
  //   Bulk: UrbType.Bulk
  // }

  constructor(public filterService: IPacketFilterService) {}

  ngOnInit() {
  }


}
