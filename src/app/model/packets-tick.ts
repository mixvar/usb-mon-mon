export class PacketsTick {
  timestamp?: number;
  inputPacketsCount: number;
  outputPacketsCount: number;
  inputDataSize: number;
  outputDataSize: number;

  public static empty() {
    const emptyTick = new PacketsTick();
    emptyTick.inputPacketsCount = 0;
    emptyTick.outputPacketsCount = 0;
    emptyTick.inputDataSize = 0;
    emptyTick.outputDataSize = 0
    return emptyTick;
  }
}
