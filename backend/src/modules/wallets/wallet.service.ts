import { HttpException, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { CreateWalletDto } from './dto/wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { ExchangeRate } from './schemas/exchange.rate.schema';
import {
  balanceByCurrency,
  checkIfIsOld,
  updateExchangeRate,
} from './utils/utils';
import handleUrl from './patterns/strategy';

@Injectable()
export class WalletsService {
  private logger = new Logger(WalletsService.name, { timestamp: true });

  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) { }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    try {
      const data = await this.getEtherscanInfo(
        createWalletDto.address,
        'txlist',
      );
      const { result: result, status } = data as unknown as {
        status: string;
        message: string;
        result: any[];
      };
      const now = new Date();
      const firstTransactionDate = new Date(parseInt(result[0].timeStamp));
      const isOld =
        status === '0' ? false : checkIfIsOld(firstTransactionDate, now);
      const wallet = {
        address: createWalletDto.address,
        exchangesRate: [
          { currency: 'USD', value: createWalletDto.USD },
          { currency: 'EURO', value: createWalletDto.EURO },
        ],
        isOld,
      };
      const createdWallet = await this.walletModel.create(wallet);
      return createdWallet;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`${error}`, 400, {
        cause: new Error(`${error}`),
      });
    }
  }

  async update(
    address: string,
    exchangeRate: ExchangeRate,
  ): Promise<{
    wallet: Wallet;
    balance: { [key: string]: string };
  }> {
    try {
      const wallet = await this.walletModel.findOne({ address });
      if (!wallet)
        throw new Error(`Wallet with address: ${address} does not exist!`);
      wallet.exchangesRate = updateExchangeRate(wallet, exchangeRate);
      const entity = await wallet.save();
      const balance = await this.balanceInfo(entity);
      return { wallet: entity, balance };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`${error}`, 400, {
        cause: new Error(`${error}`),
      });
    }
  }

  async findAll(): Promise<Wallet[]> {
    try {
      return await this.walletModel.find().populate('exchangesRate');
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`${error}`, 400, {
        cause: new Error(`${error}`),
      });
    }
  }

  async getByAddress(address: string): Promise<{
    wallet: Wallet;
    balance: { [key: string]: string };
  }> {
    try {
      const wallet = await this.walletModel.findOne({ address });
      if (!wallet)
        throw new Error(`Wallet with address: ${address} does not exist!`);
      const balance = await this.balanceInfo(wallet);
      return { wallet, balance };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`${error}`, 400, {
        cause: new Error(`${error}`),
      });
    }
  }

  async getEtherscanInfo(address: string, action: string) {
    const url = `${this.configService.get<string>(
      'ETHERSCAN_BASE_URL',
    )}?module=account&action=${handleUrl(
      address,
      action,
    )}&apikey=${this.configService.get<string>('ETHERSCAN_API_KEY')}`;
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async balanceInfo(wallet: Wallet): Promise<{ [key: string]: string }> {
    try {
      const data = await this.getEtherscanInfo(wallet.address, 'balance');
      const { result } = data as unknown as {
        status: string;
        message: string;
        result: string;
      };
      return balanceByCurrency(wallet, result);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }
}
