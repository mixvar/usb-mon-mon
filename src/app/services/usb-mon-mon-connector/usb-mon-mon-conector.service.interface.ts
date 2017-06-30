import { Observable } from 'rxjs/Observable';
import { Packet } from '../../model/packet';
import { PacketsTick } from '../../model/packets-tick';
import { AppStatus } from 'app/model/app-status';

abstract class IUsbMonMonConnector {

  abstract getStatus_(): Observable<AppStatus>;

  abstract getBufferedPackets_(): Observable<Packet[]>;

  abstract getTicks_(): Observable<PacketsTick>;

  abstract toggleActive(): void;
}

export default IUsbMonMonConnector;

