import React from 'react'

const Form = ({ children, classes }) => {


  return (
    <form className={`form-inline ${classes}`} >
  {children}
</form>
  )
}

export default Form
