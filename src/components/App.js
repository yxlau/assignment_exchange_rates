import React from 'react';
import LatestRates from './LatestRates'
import HistoricalRate from './HistoricalRate'
import Converter from './Converter'
import '../App.css';

const App = ({ latestRates, currencyList, changeLatestBase, calculatorFrom, calculatorTo, getHistoricalRate, updateFromCurrency, updateToCurrency, historicalRates, getLatestRates, conversionRates }) => {

  return (
    <div className="App">
    <header>
      <h1 className="page-title">Exchange Rates</h1>
    </header>
    <p className="text-right">
    <span><a href="#calculator">Converter</a> / <a href="#latest-rates">Current Rates</a> / <a href="#historical-rate">Historical Rate</a> </span>
    </p>
      <main className="container-fluid">
        <Converter rates={conversionRates} defaultRates={latestRates} currencyList={currencyList} updateFromCurrency={updateFromCurrency} updateToCurrency={updateToCurrency} getLatestRates={getLatestRates} />
        <hr />
        <LatestRates 
        currencies={currencyList} 
        latestRates={latestRates} 
        changeLatestBase={changeLatestBase} 
        />
         <hr />
      <HistoricalRate 
        currencyList={currencyList} 
        historicalRates={historicalRates} 
        getHistoricalRate={getHistoricalRate}
         />
      </main>
      </div>
  );
}

export default App;
