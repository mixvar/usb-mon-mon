import { Observable } from 'rxjs/Observable';
import { Packet } from '../../model/packet';
import { AppStatus } from "app/model/app-status";

abstract class IUsbMonMonConnector {

  abstract status_: Observable<AppStatus>;
  abstract packets_: Observable<Packet>;
}

export default IUsbMonMonConnector;

