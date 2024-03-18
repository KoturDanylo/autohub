export class AdvertisementResponseDto {
  advertisement_id: string;
  title: string;
  description: string;
  body: string;
  status: string;
  region: string;
  user_id: string;
  car: {
    car_id: string;
    year: number;
    color: string;
    mileage: number;
    price: number;
    currency: string;
    image: string;
  };
}
