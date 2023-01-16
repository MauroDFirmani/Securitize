import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ExchangeRateDocument = ExchangeRate & Document;

@Schema()
export class ExchangeRate {
  @ApiProperty({ required: true })
  @Prop({ type: String })
  currency: string;

  @ApiProperty({ required: true })
  @Prop({ type: Number })
  value: number;
}

export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);
