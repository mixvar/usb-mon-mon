import { Observable } from 'rxjs/Observable';
import { Packet } from '../../model/packet';
import { ServerStatus } from "app/model/server-status";

abstract class IUsbMonMonConnector {

  abstract status_: Observable<ServerStatus>;
  abstract packets_: Observable<Packet>;
}

export default IUsbMonMonConnector;

