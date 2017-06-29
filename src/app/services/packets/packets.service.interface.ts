import { Packet } from '../../model/packet';

abstract class IPacketsService {

  abstract packetsBuffer: Packet[];
  abstract filteredPacketsBuffer: Packet[];
}

export default IPacketsService;
