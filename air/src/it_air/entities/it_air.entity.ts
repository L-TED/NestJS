type MinuteFirst = '0' | '1' | '2' | '3' | '4' | '5';
type MinuteSecond = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type hour =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23';
export type minute = `${MinuteFirst}${MinuteSecond}`;

export class ItAir {
  flightName: string;
  passengerCapacity: number;
  flightSchedule?: {
    origin: string;
    destination: string;
    departureDate: Date;
    departureTime: `${hour}:${minute}`;
  };
}
