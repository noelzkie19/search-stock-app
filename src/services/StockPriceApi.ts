import axios from 'axios';
import { StockPriceRequestModel } from '../model/request/StockPriceRequestModel';
import { AppConfiguration } from 'read-appsettings-json';
const FINNHUB_URL = AppConfiguration.Setting().FINNHUB_URL;
const FINNHUB_KEY = AppConfiguration.Setting().FINNHUB_KEY; 

export const validateSymbol = async (symbol: string) => {
  try {
    const response = await fetch(`${FINNHUB_URL}/stock/symbol?exchange=US&token=${FINNHUB_KEY}`);
    const data = await response.json();
    
    // Check if the symbol exists in the response data
    const isValid = data.some((item: any) => item.symbol === symbol);
    
    return isValid;
  } catch (error) {
    console.error('Error fetching symbol data:', error);
    return false;
  }
}

export const getStockQuote = async (request: StockPriceRequestModel) => {
    try {
      const response = await axios.get(`${FINNHUB_URL}/quote`, {
        params: {
          symbol: request.symbol,
          token: FINNHUB_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      throw error;
    }
};