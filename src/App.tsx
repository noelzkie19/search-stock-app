
import './App.css';
import StockPrice from './component/StockPrice';
import { StockContextProvider } from './context/StockContext';

function App() {
  // set stockprice as child 
  return (
    <StockContextProvider> 
        <StockPrice></StockPrice>
    </StockContextProvider>
  );
}

export default App;
