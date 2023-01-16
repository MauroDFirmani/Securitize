export interface UrlFormattedStrategy {
  execute(address: string, action: string): string;
}
