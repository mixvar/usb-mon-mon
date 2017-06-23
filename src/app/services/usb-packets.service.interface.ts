import {Observable} from 'rxjs/Observable';

abstract class IUsbPacketsService {

  abstract packetsObs: Observable<string>;
  abstract greetServer(): void;

}

export default IUsbPacketsService;

