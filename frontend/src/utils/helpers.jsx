import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useHelpers() {
    const [ getTotalIncome, setGetTotalIncome ] = useState(0)
    const [ getTotalExpense, setGetTotalExpense ] = useState(0)
    const [ getAmountLeft, setGetAmountLeft ] = useState(0)


  const fetchAmountsData = async () => {
    try {
        const res = await axios.get('http://localhost:5000/getTransactions');
        const data = res.data.findAmounts;
        data.totalIncome ? setGetTotalIncome(data.totalIncome) : setGetTotalIncome(0);
        data.totalExpense ? setGetTotalExpense(data.totalExpense) : setGetTotalExpense(0);
        data.amountLeft ? setGetAmountLeft(data.amountLeft) : setGetAmountLeft(0);
    } catch (error) {
        console.error('Error found', error);
    }
  }
  useEffect(() => {
    fetchAmountsData();
  }, [])

  return [ getTotalIncome, getTotalExpense, getAmountLeft ]
}

export default useHelpers