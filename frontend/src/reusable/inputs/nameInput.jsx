import React from 'react'

function NameInput({onChange}) {
  return (
    <>
        <div className="add-transaction-name"> 
            <input 
             type="text" 
             name="" 
             id="add-transaction-name-input" 
             placeholder="Travelling"
             onChange={onChange}
             />
       </div>
    </>
  )
}

export default NameInput