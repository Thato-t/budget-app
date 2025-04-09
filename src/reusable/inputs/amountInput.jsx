import React from 'react'

function AmountInput() {
  return (
    <>
        <div className="add-transaction-amount">
            <span className="add-transaction-currency">R</span>
            <input type="number" name="amount" id="add-transaction-amount-input" placeholder="200.00"/>
        </div>
    </>
  )
}

export default AmountInput