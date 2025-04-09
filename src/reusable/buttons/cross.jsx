import React from 'react'

function Cross({onClick}) {
  return (
    <>
       <div className="add-transaction-cross-btn" onClick={onClick}>
            &times;
       </div>
    </>
  )
}

export default Cross