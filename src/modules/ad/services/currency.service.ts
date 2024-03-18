import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  constructor() {}

  async convertPriceToUAH(price: number, currency: string): Promise<string> {
    if (currency === 'UAH') {
      return `${price} UAH. Price is already in UAH.`;
    }

    const exchangeRate = await this.getExchangeRate(currency);
    if (!exchangeRate) {
      throw new Error(`Failed to retrieve exchange rate for ${currency}.`);
    }

    const calculatedPrice = price * exchangeRate;
    return `${calculatedPrice} UAH. Exchange rate: ${exchangeRate}`;
  }

  private async getExchangeRate(currency: string): Promise<number> {
    const exchangeRates = await this.fetchExchangeRates();
    const foundRate = exchangeRates.find((rate) => rate.currency === currency);
    return foundRate ? Math.floor(foundRate.saleRateNB) : null;
  }

  private async fetchExchangeRates(): Promise<any[]> {
    try {
      const response = await axios.get(this.buildCurrencyUrl());
      return response.data.exchangeRate;
    } catch (error) {
      throw new Error(`Failed to fetch currency rates: ${error.message}`);
    }
  }

  private buildCurrencyUrl(): string {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;
    return `https://api.privatbank.ua/p24api/exchange_rates?date=${formattedDate}`;
  }
}
