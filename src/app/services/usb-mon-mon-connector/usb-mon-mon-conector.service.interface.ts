import { Observable } from 'rxjs/Observable';
import { Packet } from '../../model/packet';
import { AppStatus } from 'app/model/app-status';

abstract class IUsbMonMonConnector {

  abstract getStatus_(): Observable<AppStatus>;
  abstract getPackets_(): Observable<Packet>;
  abstract toggleActive(): void;
}

export default IUsbMonMonConnector;

