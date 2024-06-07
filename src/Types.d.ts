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
  
  interface ResponseData {
    status: string;
    message: string;
    data: Car[];
  }
  