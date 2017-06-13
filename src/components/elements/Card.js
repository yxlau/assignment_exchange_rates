import React from 'react'

const Card = ({ contents }) => {
  if (!contents) {
    return null
  }
  var cards = []
  for (var key in contents) {
    if (contents.hasOwnProperty(key)) {
      cards.push(
        <div className="col" key={key}>
          <div className="custom-card">
          <span className="custom-card-title">{key}</span>
          <p className="custom-card-body">{contents[key]}</p>
          </div>
        </div>
      )
    }
  }
  return (
    <div className="row">
    {cards}
    </div>
  )
}

export default Card
