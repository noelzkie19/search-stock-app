
import { useContext, useState } from 'react';
import '../App.css';
import { StockPriceRequestModel } from '../model/request/StockPriceRequestModel';
import { StockContext } from '../context/StockContext';
import { validateSymbol } from '../services/StockPriceApi';

const StockPrice: React.FC = () => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const { getStockPriceByFilter, selectedStockPrice} = useContext(StockContext); // call props in the context
  const [loading, setLoading] = useState<boolean>(false);
  const [isSymbolValid, setIsSymbolValid] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setSearchSymbol(event.target.value)
  };

  const handleSearch = async () => {
    if (searchSymbol !== '') {
      setLoading(true);
      await validateSymbol(searchSymbol).then((result: boolean) => {
        setIsSymbolValid(result)
        if (result) {
          const requestObj: StockPriceRequestModel = {
            symbol: searchSymbol
          };
          getStockPriceByFilter(requestObj);
        }else{
          alert('invalid')
        }
      });
     
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Search Stock Price</h1>
        </div>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Stock Symbol..."
          value={searchSymbol}
          onChange={handleChange}
          className="search-input"
        />
         <button
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {!isSymbolValid && searchSymbol && (
        <p className="error-message">Invalid stock symbol. Please try again.</p>
      )}

      {selectedStockPrice && 
           <div className="table-container">
            {searchSymbol && (
            <h2 className="table-title">Stock Data for: {searchSymbol}</h2>
            )}
           <table className="data-table">
             <thead>
               <tr>
                 <th>Close Price</th>
                 <th>Dividend</th>
                 <th>Dividend Percentage</th>
                 <th>High Price</th>
                 <th>Low Price</th>
                 <th>Open Price</th>
                 <th>Previous Close Price</th>
                 <th>Total Volume</th>
               </tr>
             </thead>
             <tbody>
                   <td>{selectedStockPrice.c}</td>
                   <td>{selectedStockPrice.d}</td>
                   <td>{selectedStockPrice.dp}</td>
                   <td>{selectedStockPrice.h}</td>
                   <td>{selectedStockPrice.l}</td>
                   <td>{selectedStockPrice.o}</td>
                   <td>{selectedStockPrice.pc}</td>
                   <td>{selectedStockPrice.t}</td>
             </tbody>
           </table>
         </div>
      }
     
       
    </div>
  );
}

export default StockPrice;
