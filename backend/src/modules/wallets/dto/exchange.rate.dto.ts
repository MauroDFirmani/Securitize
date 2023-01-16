import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRatetDto {
  @ApiProperty({ required: true })
  currency: string;

  @ApiProperty({ required: true })
  value: number;
}