import { UrlFormattedStrategy } from './urlformatted.strategy';

export interface UrlFormattedTransactionsListStrategy
  extends UrlFormattedStrategy {
  address: string;
}
