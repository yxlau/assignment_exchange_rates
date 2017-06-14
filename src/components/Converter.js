import React, { Component } from 'react'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import TextInput from './elements/TextInput'
import Select from './elements/Select'


class Converter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rates: this.props.rates,
      base: 'EUR',
      to: 'USD',
      amount: 1,
      currencyList: this.props.currencyList,
      converted: 0
    }
    this.getLatestRates = this.props.getLatestRates
    this.updateAmount = this.updateAmount.bind(this)
    this.updateTo = this.updateTo.bind(this)

  }


  componentWillReceiveProps = (props) => {
    if (props.rates) {
      this.setState({ rates: props.rates }, this.updateConversion)
    }
    if (props.currencyList) {
      this.setState({ currencyList: props.currencyList })
    }
  }

  reconvertCurrency = (e) => {
    this.setState({ from: e.target.value }, this.updateConversion)
  }

  updateConversion = () => {
    this.setState({
      converted: (this.state.rates.rates[this.state.to] * this.state.amount).toFixed(2)
    })
  }

  updateBaseCurrency = (e) => {
    this.setState({ base: e.target.value })
    this.getLatestRates(e.target.value, 'conversionRates')
  }

  updateAmount = (e) => {
    this.setState({ amount: e.target.value }, this.updateConversion)
  }

  updateTo = (e) => {
    this.setState({ to: e.target.value }, this.updateConversion)
  }



  render() {
    const { currencyList, converted, amount, to, base } = this.state
    return (
      <section id="calculator">
      <h3>Converter</h3>
      <Form>
      <InputGroup>
        <TextInput type="number" value={amount} callback={this.updateAmount} step="0.01"  />
        <Select optionList={currencyList} callback={this.updateBaseCurrency} disabled={to} />
        <p className="mt-3">=</p>
      </InputGroup>
      </Form>
      <Form inline="false" classes="text-center">
      <span className="display-1">{converted}</span>
      <Select optionList={currencyList} defaultValue={to} disabled={base} callback={this.updateTo} />
      </Form>

    </section>)
  }
}

export default Converter
