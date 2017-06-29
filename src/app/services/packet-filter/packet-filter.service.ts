import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import IPacketFilterService from './packet-filter.service.interface';
import { Direction, EventType, Packet, UrbType } from '../../model/packet';


@Injectable()
export class PacketFilterService implements IPacketFilterService {

  filtersChangeEvent_: Subject<void> = new Subject<void>();

  private busFilters: Map<number, boolean> = new Map([
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true],
    [6, true],
  ]);

  private directionFilters: Map<Direction, boolean> = new Map([
    [Direction.Input, true],
    [Direction.Output, true],
  ]);

  private eventTypeFilters: Map<EventType, boolean> = new Map([
    [EventType.Callback, true],
    [EventType.Submission, true],
    [EventType.SubmissionError, true],
  ]);

  private urbTypeFilters: Map<UrbType, boolean> = new Map([
    [UrbType.Control, true],
    [UrbType.Bulk, true],
    [UrbType.Interrupt, true],
    [UrbType.Isochronous, true],
  ]);


  constructor() { }


  public getBusFilter(bus: number): boolean {
    return this.busFilters.get(bus);
  }

  public setBusFilter(bus: number, value: boolean) {
    this.busFilters.set(bus, value);
    this.filtersChangeEvent_.next();
  }

  public getDirectionFilter(direction: Direction): boolean {
    return this.directionFilters.get(direction);
  }

  public setDirectionFilter(direction: Direction, value: boolean) {
    this.directionFilters.set(direction, value);
    this.filtersChangeEvent_.next();
  }

  public getEventTypeFilter(eventType: EventType): boolean {
    return this.eventTypeFilters.get(eventType);
  }

  public setEventTypeFilter(eventType: EventType, value: boolean) {
    this.eventTypeFilters.set(eventType, value);
    this.filtersChangeEvent_.next();
  }

  public getUrbTypeFilter(urbType: UrbType): boolean {
    return this.urbTypeFilters.get(urbType);
  }

  public setUrbTypeFilter(urbType: UrbType, value: boolean) {
    this.urbTypeFilters.set(urbType, value);
    this.filtersChangeEvent_.next();
  }

  public filter(packet: Packet): boolean {
    const { parsedData } = packet;

    return (
      this.busFilters.get(parsedData.busNumber) &&
      this.directionFilters.get(parsedData.direction) &&
      this.eventTypeFilters.get(parsedData.eventType) &&
      this.urbTypeFilters.get(parsedData.urbType)
    );
  }

}
