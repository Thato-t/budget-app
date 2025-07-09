import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/localStorage.jsx'

function useHelpers() {
    const backendURL = import.meta.env.BACKEND_URI || 'http://localhost:5000';
    const [ getTotalIncome, setGetTotalIncome ] = useState(0);
    const [ getTotalExpense, setGetTotalExpense ] = useState(0);
    const [ getAmountLeft, setGetAmountLeft ] = useState(0);
    const localStrEmail = useLocalStorage();


    const fetchAmountsData = async () => {
      try {
        const res = await axios.get(`${backendURL}/getTransactions/${localStrEmail}`);
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
  }, [localStrEmail])

  return [ getTotalIncome, getTotalExpense, getAmountLeft ]
}

export default useHelpers