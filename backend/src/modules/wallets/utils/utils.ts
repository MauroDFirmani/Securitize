import { ExchangeRate } from '../schemas/exchange.rate.schema';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';

export function checkIfIsOld(startDate: Date, endDate: Date): boolean {
  const checkDay: number = startDate.getDate() + 1 > endDate.getDate() ? -1 : 0;
  const monthsDifference =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear()) +
    checkDay;
  return monthsDifference < 12 ? false : true;
}

export function balanceByCurrency(wallet: Wallet, result: string) {
  const etherBalanceByCurrency: { [key: string]: string } = {};
  for (let i = 0; i < wallet.exchangesRate.length; i++) {
    etherBalanceByCurrency[wallet.exchangesRate[i].currency] = (
      parseFloat(result) *
      wallet.exchangesRate[i].value *
      Math.pow(10, -18)
    ).toFixed(2);
  }
  return etherBalanceByCurrency;
}

export function updateExchangeRate(
  wallet: WalletDocument,
  exchangeRate: ExchangeRate,
): ExchangeRate[] {
  try {
    const currenciesToUpdate: { [key: string]: number } = {};
    currenciesToUpdate[exchangeRate.currency] = exchangeRate.value;
    for (let i = 0; i < wallet.exchangesRate.length; i++) {
      if (!currenciesToUpdate[wallet.exchangesRate[i].currency]) {
        currenciesToUpdate[wallet.exchangesRate[i].currency] =
          wallet.exchangesRate[i].value;
      }
    }
    const auxExchangeRates: ExchangeRate[] = [];
    Object.keys(currenciesToUpdate).map((e) => {
      auxExchangeRates.push({ currency: e, value: currenciesToUpdate[e] });
    });
    return auxExchangeRates;
  } catch (error) {
    this.logger.error(error);
    throw new Error(`Error trying to update exchanges rate: ${error}`);
  }
}
