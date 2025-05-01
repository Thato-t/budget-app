import { useEffect, useState } from 'react'


const useLocalStorageName = (key, transaction) => {
    const [ values, setValues ] = useState('')
    const [ transactions, setTransactions ] = useState([])

    // * fetching, storing for the username

    const setItems = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }  

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(key));
        setValues(item)
    }, [key])

    const removeItems = () => {
        setValues('')
        localStorage.removeItem(key);
    }

    // * fetching, storing for the transactions
    
    const setItemsTransactions = (value) => {
        const updatedData = [...transactions, value]; // Append the new value to the existing array
        setTransactions([...updatedData]); // Update the state
        localStorage.setItem(transaction, JSON.stringify(updatedData)); // Save to localStorage
    }
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(transaction)) || [];
        setTransactions(item);
    }, [transaction])

    const removeItemsTransactions = () => {
        localStorage.removeItem(transaction)
        setTransactions([])
    }


    return [ setItems, removeItems, values, setItemsTransactions, removeItemsTransactions, transactions ]
}
export default useLocalStorageName
