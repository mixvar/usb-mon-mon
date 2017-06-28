export class Packet {
  date: number;
  rawRecord: string;
  parsedData: {
    urbTag: string;
    timestamp: number;
    eventType: EventType;
    urbType: UrbType;
    direction: Direction;
    busNumber: number;
    deviceAddress: number;
    endpointNumber: number;
    urbStatus: {
      status?: number;
      interval?: number;
      startFrame?: number;
      errorCount?: number;
    };
    setupPacket: {
      setupTag?: string;
      bmRequestType?: string;
      bRequest?: string;
      wValue?: string;
      wIndex?: string;
      wLength?: string;
    };
    isochronousFrameDescriptors?: string[];
    dataBytesCount: number;
    data?: string;
  };

  public getDirection(): string {
    return Direction[this.parsedData.direction];
  }

  public getEventType(): string {
    return EventType[this.parsedData.eventType];
  }

  public getUrbType(): string {
    return UrbType[this.parsedData.urbType];
  }

  public getIsochronousFrameDescriptors(): string {
    if (this.parsedData.isochronousFrameDescriptors && this.parsedData.isochronousFrameDescriptors.length) {
      return this.parsedData.isochronousFrameDescriptors
        .reduce((acc, e, i) => {
          return (i === 0) ? `[${e}]` : `${acc}, [${e}]`;
        }, '');
    } else {
      return null;
    }
  }
}


export enum EventType {
  Submission,
  Callback,
  SubmissionError,
}


export enum UrbType {
  Control,
  Isochronous,
  Interrupt,
  Bulk
}


export enum Direction {
  Input,
  Output,
}

