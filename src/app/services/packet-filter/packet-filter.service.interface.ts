import { Direction, EventType, Packet, UrbType } from '../../model/packet';
import { Observable } from 'rxjs/Observable';

abstract class IPacketFilterService {

  abstract filtersChangeEvent_: Observable<void>;

  abstract filter(packet: Packet): boolean;

  abstract getBusFilter(bus: number): boolean;
  abstract setBusFilter(bus: number, value: boolean);

  abstract getDirectionFilter(direction: Direction): boolean;
  abstract setDirectionFilter(direction: Direction, value: boolean);

  abstract getEventTypeFilter(eventType: EventType): boolean;
  abstract setEventTypeFilter(eventType: EventType, value: boolean);

  abstract getUrbTypeFilter(urbType: UrbType): boolean;
  abstract setUrbTypeFilter(urbType: UrbType, value: boolean);
}

export default IPacketFilterService;
