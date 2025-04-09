import React from 'react'

function Create({onClick}) {
  return (
    <>
        <div className="add-transaction-btn" onClick={onClick}>
            create
        </div>
    </>
  )
}

export default Create