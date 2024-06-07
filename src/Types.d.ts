import { Dayjs } from "dayjs";

interface Rates {
  hourly: number;
  daily: number;
  weekly: number;
}

interface Features {
  [key: string]: string[];
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  bags: number;
  features: Features;
  rates: Rates;
  imageURL: string;
}

export interface ResponseData {
  status: string;
  message: string;
  data: Car[];
}

type AdditionalCharges = number[];

export interface FormData {
  ReservationID: string;
  PickupDate: Dayjs;
  ReturnDate: Dayjs;
  Discount: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: number;
  AdditionalCharges: AdditionalCharges;
  VehicleType: string;
  Vehicle: string;
}


export type DynamicStateType = {
  [key: string]: number | string | number[] | string[] | boolean;
};

export type Summary={
  Charge:string
  Unit?:number
  Rate?:number
  Total?:number
}

export type Percentage={
  type:'+'|'-'
  value:number
}