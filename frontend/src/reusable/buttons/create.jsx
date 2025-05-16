import React from 'react'

function Create({ onClick}) {
  return (
    <>
        <button
         type="submit"
         className="add-transaction-btn" 
         onClick={() => {onClick}}
        >
            create
        </button>
    </>
  )
}

export default Create