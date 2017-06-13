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
      historicalBase: 'EUR',
      historicalComparison: 'USD'
    }
    this.getLatestRates = this.getLatestRates.bind(this)
    this.changeLatestBase = this.changeLatestBase.bind(this)
    this.getHistoricalRate = this.getHistoricalRate.bind(this)
    this.updateHistoricalBase = this.updateHistoricalBase.bind(this)
    this.updateHistoricalComparison = this.updateHistoricalComparison.bind(this)
  }

  componentDidMount() {
    this.getLatestRates();
    this.getHistoricalRate();
  }

  setupBase = (base) => {
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
        // returns { base: .. date: .. rates: {...} }
    }
    Promise.all(fetches)
      .then((data) => {
        this.setState({
          historicalRates: this.parseHistoricalRates(data)
        })
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }

  parseHistoricalRates = (rates) => {
    console.log(rates);
    var dates = ["3 years ago", "2 years ago", "last year", "now"]
    var parsed = {}
    for (var i = 0; i < dates.length; i++) {
      parsed[dates[i]] = rates[i].rates[this.state.historicalComparison]
    }
    return parsed
  }

  updateHistoricalBase = (e) => {
    e.preventDefault()
    var newBase = e.target.value
    console.log('updatehistoricalbase')
    this.setState({ historicalBase: newBase },
      this.getHistoricalRate(newBase)
    )
  }

  updateHistoricalComparison = (e) => {
    console.log('updatehistoricalcomparison', e.target.value)
    var newComp = e.target.value
    this.setState({ historicalComparison: newComp }, this.getHistoricalRate(null, newComp));
  }


  getLatestRates = (base) => {
    const url = base ? 'http://api.fixer.io/latest?base=' + base : 'http://api.fixer.io/latest';
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
        console.log('latest rates response:', rates)
        if (!this.state.currencies) {
          this.setupCurrencyList(rates)
          this.setState({ latestRates: rates })

        } else {
          this.setState({ latestRates: rates })
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
    // const { currencyList, latestRates, historicalRates } = this.state
    return (
      <App  
      changeLatestBase={this.changeLatestBase} getHistoricalRate={this.getHistoricalRate} updateHistoricalBase={this.updateHistoricalBase} updateHistoricalComparison={this.updateHistoricalComparison} {...this.state} />
    )
  }

}

export default AppContainer
