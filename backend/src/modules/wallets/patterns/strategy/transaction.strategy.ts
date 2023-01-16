import { UrlFormattedTransactionsListStrategy } from './interfaces';

export class TransactionsStrategy
  implements UrlFormattedTransactionsListStrategy
{
  public constructor(public address: string, public action: string) {}

  public execute(address: string, action: string): string {
    return `${action}&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`;
  }
}
