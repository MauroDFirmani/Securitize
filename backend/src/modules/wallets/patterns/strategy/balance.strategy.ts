import { UrlFormattedBalanceStrategy } from './interfaces';

export class BalanceStrategy implements UrlFormattedBalanceStrategy {
  public constructor(public address: string, action: string) {}

  public execute(address: string, action: string): string {
    return `${action}&address=${address}&tag=latest`;
  }
}
