import { useEffect, useState } from 'react'


const useLocalStorageName = (key, transaction) => {
    const [ values, setValues ] = useState('')
    const [ transactions, setTransactions ] = useState()

    // * fetching, storing for the username

    const setItems = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }  

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(key));
        setValues(item)
    }, [key])

    const removeItems = () => {
        localStorage.removeItem(key);
        setValues('')
    }

    // * fetching, storing for the transactions

    const setItemsTransactions = (value) => {
        localStorage.setItem(transaction, JSON.stringify(value))
    }

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(transaction))
        setTransactions(item)
    }, [transactions])

    const removeItemsTransactions = () => {
        localStorage.removeItem(transaction)
        setTransactions([])
    }


    return [ setItems, removeItems, values, setItemsTransactions, removeItemsTransactions, transactions ]
}
export default useLocalStorageName
