export interface Packet {
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
    urbStatus?: {
      status: number;
      interval?: number;
      startFrame?: number;
      errorCount?: number;
    };
    setupPacket?: {
      setupTag: string;
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

};

export enum EventType {
  Submission,
  Callback,
  SubmissionError,
};

export enum UrbType {
  Control,
  Isochronous,
  Interrupt,
  Bulk
};

export enum Direction {
  Input,
  Output,
};
