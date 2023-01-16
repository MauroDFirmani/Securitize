import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../schemas/wallet.schema';

export class CreateWalletDto {
  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: true })
  USD: number;

  @ApiProperty({ required: true })
  EURO: number;
}

export class WalletInfoDto {
  @ApiProperty({ required: true, type: Wallet })
  wallet: Wallet;

  @ApiProperty({ required: true, type: Object })
  balance: { [key: string]: string };

  @ApiProperty({ required: true, type: Boolean })
  isOld: boolean;
}