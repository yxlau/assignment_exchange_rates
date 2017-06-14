import React, { Component } from 'react'
import { formatDate } from '../helpers/helpers'
import App from '../components/App'


class AppContainer extends Component {
  // get currencies and store them somewhere for our dropdowns
  // display exchange rate 

  constructor() {
    super()
    this.state = {
      base: 'EUR',
      comparison: 'USD',
    }
  }

  componentDidMount() {
    this.getLatestRates();
    this.getHistoricalRate();
  }

  setupBase = (base) => {
    // by default, fixer.io uses EUR as its base
    // this ensures that we don't make a GET request with ?base=EUR to fixer.io
    if (base === 'EUR') {
      return null
    }
    return base
  }

  getHistoricalRate = (base, comparison) => {
    base = this.setupBase(base);
    const now = new Date();
    const aYear = 1000 * 365 * 24 * 60 * 60
    const lastYear = formatDate(new Date(now.getTime() - aYear))
    const twoYears = formatDate(new Date(now.getTime() - (aYear * 2)))
    const threeYears = formatDate(new Date(now.getTime() - (aYear * 3)))
    const years = [threeYears, twoYears, lastYear, formatDate(now)]
    comparison = comparison || this.state.comparison
    var fetches = []

    for (var i = 0; i < years.length; i++) {
      var url = base ? 'https://api.fixer.io/' + years[i] + '?base=' + base : 'https://api.fixer.io/' + years[i];
      fetches.push(
        fetch(url, { method: 'GET' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Couldn\'t retrieve rate for date ' + years[i] + 'and base ' + base)
          }
          return response.json()
        }))
    }
    Promise.all(fetches)
      .then((data) => {
        this.setState({
          historicalRates: this.parseHistoricalRates(data, comparison)
        })
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }

  parseHistoricalRates = (rates, comparison) => {
    var dates = ["3 years ago", "2 years ago", "last year", "now"]
    var parsed = {}
    for (var i = 0; i < dates.length; i++) {
      parsed[dates[i]] = rates[i].rates[comparison]
    }

    return parsed
  }


  updateFromCurrency = (e) => {
    e.preventDefault()
    this.setState({ calculatorFrom: e.target.value },
      this.getLatestRates(e.target.value)
    )

  }


  getLatestRates = (base, target) => {
    target = target || 'latestRates'
    base = this.setupBase(base)
    const url = base ? 'https://api.fixer.io/latest?base=' + base : 'https://api.fixer.io/latest';
    const options = {
      method: 'GET',
    }
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Couldn\'t retrieve latest rates for base currency ' + base);
        }
        return response.json()
      })
      .then((rates) => {
        if (!this.state.currencyList) {
          this.setupCurrencyList(rates)
          this.setState({ latestRates: rates })
          this.setState({ conversionRates: rates })
        } else {
          this.setState({
            [target]: rates
          })
        }
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  changeLatestBase = (e) => {
    e.preventDefault()
    this.getLatestRates(e.target.value);
  }

  setupCurrencyList = (rates) => {
    var currencyList = Object.keys(rates.rates)
    currencyList.unshift(rates.base);
    this.setState({ currencyList: currencyList })
  }


  render() {
    return (
      <App  
      changeLatestBase={this.changeLatestBase} getHistoricalRate={this.getHistoricalRate} 
      updateFromCurrency={this.updateFromCurrency} getLatestRates={this.getLatestRates}
      {...this.state} />
    )
  }

}

export default AppContainer
