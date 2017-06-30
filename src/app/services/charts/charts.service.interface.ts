abstract class IChartsService {

  abstract timeScale: number;
  abstract timeSlice: number;
  abstract ticsCount: number;

  abstract getInputPacketsTicks(): number[];
  abstract getOutputPacketsTicks(): number[];

  abstract getInputDataTicks(): number[];
  abstract getOutputDataTicks(): number[];

  abstract getChartTimeScale(): string[];

  abstract clearCharts(): void;
}

export default IChartsService;
