import React, { Component } from 'react'

// class Select extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: this.props.defaultValue,
//     }
//     this.callback = this.props.callback
//   }

//   componentWillReceiveProps = (props) => {
//     if (props.optionList) {
//       this.setupOptions(props.optionList);
//     }
//   }

//   setupOptions = (optionList) => {
//     var options;
//     if (optionList) {
//       options = optionList.map((option) => (
//         <option value={option} key={option}>{option}</option>
//       ))
//     } else {
//       options = <option value="Loading">Loading...</option>
//     }
//     this.setState({ options: options })
//   }

//   updateValue = (e) => {
//     e.preventDefault();
//     this.setState({ value: e.target.value })
//     this.callback(e);
//   }

//   render() {
//     const { value, options } = this.state

//     return (
//       <select className="mb-2 mr-sm-2 mb-sm-0" onChange={this.updateValue} value={value} >
//     {options}
//   </select>)
//   }
// }

// export default Select


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

  // this.updateValue = (e) => {
  //   e.preventDefault();
  //   console.log(e, e.target.value);
  //   e.target.value = e.target.value
  // }


  return (
    <select className="mb-2 mr-sm-2 mb-sm-0" onChange={callback} value={defaultValue} >
    {options}
  </select>)
}

export default Select
