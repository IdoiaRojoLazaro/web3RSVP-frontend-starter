export interface Event {
  id: number;
  name: string;
  eventTimestamp: string;
  imageURL: string
  totalRSVPs: number;
  maxCapacity: number;
  [key: string]: any;
}