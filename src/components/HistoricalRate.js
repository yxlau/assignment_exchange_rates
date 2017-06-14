import React, { Component } from 'react'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import Select from './elements/Select'
import Card from './elements/Card'

class HistoricalRate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currencyList: this.props.currencyList,
      historicalRates: this.props.historicalRates,
      base: this.props.base || 'EUR',
      comparison: this.props.comparison || 'USD'
    }
    this.getHistoricalRate = this.props.getHistoricalRate
  }

  componentWillReceiveProps = (props) => {
    if (props.currencyList) {
      this.setState({ currencyList: props.currencyList })
    }
    if (props.base) {
      this.setState({ base: props.base })
    }
    if (props.comparison) {
      this.setState({ comparison: props.comparison })
    }
    if (props.historicalRates) {
      this.setState({ historicalRates: props.historicalRates })
    }

  }

  updateBase = (e) => {
    this.setState({ base: e.target.value })
    this.getHistoricalRate(e.target.value, this.state.comparison)
  }

  updateComparison = (e) => {
    this.setState({ comparison: e.target.value })
    this.getHistoricalRate(this.state.base, e.target.value)
  }


  render() {


    const { currencyList, base, comparison, historicalRates } = this.state

    const cards = <Card contents={historicalRates} />


    return (
      <section id="historical-rate">
    <h3>Historical Rate</h3>
    <Form classes="mb-2">
    <InputGroup name="latest-rates">
    <Select optionList={currencyList} callback={this.updateBase} defaultValue={base} disabled={comparison} />
    <Select optionList={currencyList} callback={this.updateComparison} defaultValue={comparison} disabled={base} />
    </InputGroup> 
      </Form>
      {cards}
    </section>
    )
  }

}

export default HistoricalRate
