import React from 'react'

const Select = ({ optionList, callback, defaultValue, disabled }) => {
  let options
  if (optionList) {
    options = optionList.map((option) => {
      if (option === disabled) {
        return <option value={option} key={option} disabled>{option}</option>
      }
      return <option value={option} key={option}>{option}</option>
    })
  } else {
    options = <option value="Loading">Loading...</option>
  }

  return (
    <select className="mb-2 mr-sm-2 mb-sm-0" onChange={callback} value={defaultValue}>
    {options}
  </select>
  )
}

export default Select
