import React from 'react'

const Row = ({ values }) => {
  let columns = [];

  if (values) {
    for (var i = 0; i < values.length; i++) {
      columns.push(<td key={values[i]}>{values[i]}</td>)
    }
  }


  return (
    <tr>
    {columns}
  </tr>
  )
}

export default Row
