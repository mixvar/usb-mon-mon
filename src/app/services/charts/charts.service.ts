import { Injectable } from '@angular/core';
import * as moment from 'moment';

import IChartsService from './charts.service.interface';
import IUsbMonMonConnector from '../usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { PacketsTick } from '../../model/packets-tick';


@Injectable()
export class ChartsService implements IChartsService {

  public timeScale;
  public timeSlice = 1000; // its actually controlled by the server
  public ticsCount = 60;

  private ticksBuffer: Array<PacketsTick> = Array(this.ticsCount);

  constructor(private ummConnector: IUsbMonMonConnector) {
    ummConnector.getTicks_().subscribe(
      (tick) => this.onTick(tick)
    );
    this.timeScale = this.ticsCount * this.timeSlice;
    this.clearCharts();
  }

  clearCharts(): void {
    this.ticksBuffer.fill(PacketsTick.empty());
  }

  getInputPacketsTicks(): number[] {
    return this.ticksBuffer.map((tick) => (
      tick.inputPacketsCount
    ));
  }

  getOutputPacketsTicks(): number[] {
    return this.ticksBuffer.map((tick) => (
      tick.outputPacketsCount
    ));
  }

  getInputDataTicks(): number[] {
    return this.ticksBuffer.map((tick) => (
      tick.inputDataSize / 1000 // kB
    ));
  }

  getOutputDataTicks(): number[] {
    return this.ticksBuffer.map((tick) => (
      tick.outputDataSize / 1000 // kB
    ));
  }

  getChartTimeScale(): string[] {
    return this.ticksBuffer.map((tick) => (
      (tick.timestamp) ? moment(tick.timestamp).format('HH:mm:ss') : ''
    ));
  }

  private onTick(tick: PacketsTick) {
    this.ticksBuffer.shift();
    this.ticksBuffer.push(tick);
  }

}
