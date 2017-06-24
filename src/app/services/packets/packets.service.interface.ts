import { Packet } from '../../model/packet';

abstract class IPacketsService {

  abstract packetsBuffer: Packet[];
  abstract setBufferSize(size: number): void;
}

export default IPacketsService;
