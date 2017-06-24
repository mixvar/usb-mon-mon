import {Observable} from 'rxjs/Observable';
import {Packet} from '../model/packet';

abstract class IUsbPacketsService {

  abstract packets_: Observable<Packet>;
  abstract greetServer(): void;

}

export default IUsbPacketsService;

