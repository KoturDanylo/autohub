import { ModelResponseDto } from './model.response.dto';

export class ModelListResponseDto {
  data: ModelResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
