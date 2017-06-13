import React from 'react';
import LatestRates from './LatestRates'
import HistoricalRate from './HistoricalRate'
import '../App.css';

const App = ({ latestRates, currencyList, changeLatestBase, historicalRates, updateHistoricalBase, updateHistoricalComparison, historicalBase, historicalComparison }) => {

  console.log('historical base', historicalBase)
  return (
    <div className="App">
    <header>
      <h1 className="page-title">Exchange Rates</h1>
    </header>
      <main className="container-fluid">
        {/*<LatestRates currencies={currencyList} latestRates={latestRates} changeLatestBase={changeLatestBase} />  */}
       { <HistoricalRate 
        currencyList={currencyList} 
        historicalRates={historicalRates} updateHistoricalBase={updateHistoricalBase} updateHistoricalComparison={updateHistoricalComparison} 
        comparison={historicalComparison} 
        base={historicalBase} /> }
      </main>
      </div>
  );
}

export default App;
