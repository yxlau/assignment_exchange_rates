import React from 'react'

const TextInput = (props) => {
  const { type, value, callback, ...rest } = props
  return (
    <input type={type} className="form-control" value={value} onChange={callback} {...rest} />
  )
}

export default TextInput
