import { Packet } from '../../model/packet';

abstract class IPacketsService {

  abstract filteredPacketsBuffer: Packet[];

  abstract clearBuffers(): void;
}

export default IPacketsService;
