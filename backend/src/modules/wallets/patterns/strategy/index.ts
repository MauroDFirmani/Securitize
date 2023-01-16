import { BalanceStrategy } from './balance.strategy';
import { UrlFormatted } from './urlformatted';
import { TransactionsStrategy } from './transaction.strategy';

const handleUrl = (address: string, action: string): string => {
  const urlformatted = new UrlFormatted();
  if (action === 'balance') {
    urlformatted.setStrategy(new BalanceStrategy(address, action));
  } else {
    urlformatted.setStrategy(new TransactionsStrategy(address, action));
  }
  return urlformatted.execute(address, action);
};

export default handleUrl;
