import { AdvertisementResponseDto } from './advertisement.response.dto';

export class AdvertisementListResponseDto {
  data: AdvertisementResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
