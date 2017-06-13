import React from 'react'
import Row from './elements/Row'

const Table = ({ headingList, rows }) => {
  let content = []
  const headings = headingList.map((heading) => (
    <th key={heading}>{heading}</th>
  ))

  if (rows) {
    var rates = rows.rates
    for (var currency in rates) {
      if (rates.hasOwnProperty(currency)) {
        content.push(<Row key={currency}  values={[currency, rates[currency]]} />)
      }
    }
  } else {
    content = ''
  }

  return (
    <table className="table">
    <thead>
      <tr>
      {headings}
      </tr>
    </thead>
    <tbody>
    {content}
    </tbody>
    </table>
  )
}

export default Table
