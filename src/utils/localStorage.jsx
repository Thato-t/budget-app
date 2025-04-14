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
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(transaction)) || [];
        setTransactions([...item]);
    }, [key])

    const setItemsTransactions = (value) => {
        const updatedData = [value, ...transactions];
        setTransactions([...updatedData]);
        localStorage.setItem(transaction, JSON.stringify(updatedData));
    }

    const removeItemsTransactions = () => {
        localStorage.removeItem(transaction)
        setTransactions([])
    }


    return [ setItems, removeItems, values, setItemsTransactions, removeItemsTransactions, transactions ]
}
export default useLocalStorageName
