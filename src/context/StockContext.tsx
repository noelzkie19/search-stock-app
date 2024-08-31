import React, { ReactNode, useMemo, useState } from "react"
import { StockPriceResponseModel } from "../model/response/StockPriceResponseModel"
import { STOCK_DEFAULT } from "../constant/StockDefault"
import { useAsyncFn } from 'react-use'
import { getStockQuote } from "../services/StockPriceApi"

interface IProps {
    fetchingSelectedStockPrice: boolean
    selectedStockPrice: StockPriceResponseModel | null
    getStockPriceByFilter: (...args: any) => Promise<void>
}

interface StockContextProviderProps {
    children: ReactNode;
}

export const StockContext = React.createContext<IProps>({
    fetchingSelectedStockPrice: false,
    selectedStockPrice: STOCK_DEFAULT,
    getStockPriceByFilter: async (...args: any) => { }
})

export const StockContextProvider: React.FC<StockContextProviderProps> = ({ children }) => {
    const [selectedStockPrice, setSelectedStockPrice] = useState<StockPriceResponseModel | null>(STOCK_DEFAULT);
    // fetch form API service can be used across child nodes 
    const [{ loading: fetchingSelectedStockPrice }, getStockPriceByFilter] = useAsyncFn(async (...args) => {
      try {
        const [keyword] = args;
        getStockQuote(keyword).then((result: any) => {
            if(result){
                setSelectedStockPrice(result);
            }else{
                setSelectedStockPrice(null)
            }
        })
      } catch (ex) {
      }
  
    }, [setSelectedStockPrice])
    
    // use to set Props to be called when using context
    const value: IProps = useMemo(() => {
      // Group related properties
      const stockPrice = {
        selectedStockPrice,
        getStockPriceByFilter,
        fetchingSelectedStockPrice
      };
    
      return {
        ...stockPrice
      };
    }, [
        selectedStockPrice,
        getStockPriceByFilter,
        fetchingSelectedStockPrice
    ]);
  
    return <StockContext.Provider value={value}>{children}</StockContext.Provider>
  }