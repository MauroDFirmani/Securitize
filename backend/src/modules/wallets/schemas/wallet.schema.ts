import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ExchangeRate, ExchangeRateSchema } from './exchange.rate.schema';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @ApiProperty({ required: true })
  @Prop({ type: String, index: true, unique: true, trim: true })
  address: string;

  @ApiProperty({ required: true, type: [ExchangeRate] })
  @Prop({ required: true, type: [ExchangeRateSchema] })
  exchangesRate: ExchangeRate[];

  @ApiProperty({ type: Boolean })
  @Prop({ required: true, type: Boolean })
  isOld: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
