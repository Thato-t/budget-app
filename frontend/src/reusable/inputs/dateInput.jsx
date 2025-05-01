import React from 'react'

function DateInput({onChange}) {
  return (
    <>
       <div className="add-transaction-name"> 
            <input 
             type="date" 
             name="" 
             id="add-transaction-name-input" 
             onChange={onChange}
             />
       </div>
    </>
  )
}

export default DateInput