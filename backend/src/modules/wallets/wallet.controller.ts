import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ExchangeRatetDto } from './dto/exchange.rate.dto';
import { CreateWalletDto, WalletInfoDto } from './dto/wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { WalletsService } from './wallet.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Create wallet' })
  @ApiResponse({
    status: 200,
    description: 'Create wallet',
    type: Wallet,
    isArray: true,
  })
  @HttpCode(HttpStatus.CREATED)
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all wallets' })
  @ApiResponse({
    status: 200,
    description: 'Find all wallets',
    type: Array,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.walletsService.findAll();
  }

  @Get('/:address')
  @ApiOperation({ summary: 'Get wallet info by address' })
  @ApiParam({ name: 'address', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'get wallet info by address',
    type: WalletInfoDto,
  })
  @HttpCode(HttpStatus.OK)
  getWallet(@Param('address') address: string) {
    return this.walletsService.getByAddress(address);
  }

  @Put('/:address')
  @ApiOperation({ summary: 'Update wallet' })
  @ApiParam({ name: 'address', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Update wallet',
    type: WalletInfoDto,
  })
  @HttpCode(HttpStatus.OK)
  updateWalletExchangeRates(
    @Param('address') address: string,
    @Body() exchangeRate: ExchangeRatetDto,
  ) {
    return this.walletsService.update(address, exchangeRate);
  }
}
