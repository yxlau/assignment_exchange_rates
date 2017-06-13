import React from 'react'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import Table from './Table'
import Select from './elements/Select'

const LatestRates = ({ latestRates, currencies, changeLatestBase }) => {
  const tableHeadings = ['Currency', 'Price']

  return (
    <section id="latest-rates">
    <Form >
    <InputGroup name="latest-rates">
    <h3 className="mr-2">Current Rates</h3>
    <Select optionList={currencies} callback={changeLatestBase} />
    </InputGroup> 
      </Form>
      <Table headingList={tableHeadings} rows={latestRates} />
      </section>
  )
}

export default LatestRates
