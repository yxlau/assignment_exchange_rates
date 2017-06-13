import React, { Component } from 'react'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import Select from './elements/Select'
import Card from './elements/Card'

// change this to class
// select can become functional again
// save state here. default values, callback to update value


class HistoricalRate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currencyList: this.props.currencyList,
      historicalRates: this.props.historicalRates,
      base: this.props.base,
      comparison: this.props.comparison
    }
    this.updateHistoricalBase = this.props.updateHistoricalBase
    this.updateHistoricalComparison = this.props.updateHistoricalComparison
  }

  componentWillReceiveProps = (props) => {
    console.log('received props', props);
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


  render() {


    const { currencyList, base, comparison, historicalRates } = this.state

    const cards = <Card contents={historicalRates} />


    return (
      <section id="historical-rate">
    <h3>Historical Rate</h3>
    <Form classes="mb-2">
    <InputGroup name="latest-rates">
    <Select optionList={currencyList} callback={this.updateHistoricalBase} defaultValue={base} disabled={comparison} />
    <Select optionList={currencyList} callback={this.updateHistoricalComparison} defaultValue={comparison} disabled={base} />
    </InputGroup> 
      </Form>
      {cards}
    </section>
    )
  }


  // const HistoricalRate = ({ currencyList, historicalRates, updateHistoricalBase, updateHistoricalComparison }) => {

  //   console.log('historicalRates', historicalRates);


  //   return (
  //     <section id="historical-rate">
  //     <h3>Historical Rate</h3>
  //     <Form >
  //     <InputGroup name="latest-rates">
  //     <Select optionList={currencyList} callback={updateHistoricalBase} defaultValue="EURO" />
  //     <Select optionList={currencyList} callback={updateHistoricalComparison} defaultValue="USD" />
  //     </InputGroup> 
  //       </Form>

  //     <div className="row">
  //     <div className="col">
  //       3 years ago

  //     </div>
  //     <div className="col">
  // 2 years ago
  //     </div>
  //     <div className="col">
  // 1 year ago
  //     </div>
  //     </div>
  //     </section>
  //   )
}

export default HistoricalRate
