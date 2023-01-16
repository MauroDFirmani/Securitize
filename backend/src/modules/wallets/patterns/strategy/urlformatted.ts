import { UrlFormattedStrategy } from './interfaces';

export class UrlFormatted {
  private context?: UrlFormattedStrategy;

  public setStrategy(context: UrlFormattedStrategy): void {
    this.context = context;
  }

  public execute(address: string, action: string): string {
    if (!this.context) {
      throw new Error('Context must be defined before running.');
    }

    return this.context.execute(address, action);
  }
}
