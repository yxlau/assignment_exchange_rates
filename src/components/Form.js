import React from 'react'

const Form = ({ children, classes, inline }) => {
  classes = classes || ''
  classes = inline === 'false' ? classes : 'form-inline ' + classes

  return (
    <form className={`${classes}`} >
  {children}
</form>
  )
}

export default Form
