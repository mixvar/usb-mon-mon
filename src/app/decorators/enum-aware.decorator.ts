import {EventType, UrbType, Direction} from '../model/packet';

/** makes it possible to use enums from inside html templates **/
export function EnumAware(constructor: Function) {
  constructor.prototype.EventType = EventType;
  constructor.prototype.UrbType = UrbType;
  constructor.prototype.Direction = Direction;
}
