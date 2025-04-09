import React from 'react'

function TypeOfCategory({ text, color}) {
  return (
    <>
        <div className="add-transaction-selected-category"
         style={{backgroundColor: color}}>
            {text}
        </div>
    </>
  )
}

export default TypeOfCategory