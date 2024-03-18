import { BrandResponseDto } from './brand.response.dto';

export class BrandListResponseDto {
  data: BrandResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
