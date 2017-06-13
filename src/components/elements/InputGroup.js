 import React from 'react'

 const InputGroup = ({ labelText, name, children }) => {

   return (
     <div className="input-group">
     <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">{labelText}</label>
     {children}
     </div>
   )
 }

 export default InputGroup
