import { AdResponseDto } from './ad.response.dto';

export class AdListResponseDto {
  data: AdResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
