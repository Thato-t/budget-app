import React, { useEffect, useState } from 'react'
import './addTransaction.scss'
import AmountInput from '../../reusable/inputs/amountInput.jsx'
import NameInput from '../../reusable/inputs/nameInput.jsx'
import DateInput from '../../reusable/inputs/dateInput.jsx'
import CommentInput from '../../reusable/inputs/commentInput.jsx'
import Cross from '../../reusable/buttons/cross.jsx'
import Create from '../../reusable/buttons/create.jsx'
import TypeOfCategory from '../../reusable/typeOfCategory.jsx'
import useLocalStorageName from '../../utils/localStorage.jsx'


function AddTransaction({ show, onClose }) {



    const [ quote, setQuote ] = useState();
    const [ exampleCategories, setExampleCategories ] = useState([]);
    const [ category, setCategory ] = useState();
    const [ selectOption, setSelectOption] = useState('fixedExpenses');
    const [ isPressed, setIsPressed ] = useState(false);
    const [ typeOfCategory, setTypeOfCategory ] = useState();
    const [ categoryColor, setCategoryColor ] = useState();
    const [ isLoading, setIsLoading ] = useState(false) 
    const [ setItemsTransactions ] = useLocalStorageName('transactions');
    const [ count, setCount] = useState(1);
    const [ categoryChange, setCategoryChange ] = useState('');
    const [ dateChange, setDateChange ] = useState('');
    const [ amountSpentChange, setAmountSpentChange ] = useState('');
    const [ commentChange, setCommentChange ] = useState('');
    const [ amountLimitChange, setAmountLimitChange ] = useState('');
    const [ categoryEmoji, setCategoryEmoji ] = useState();
    const  [ errMsg, setErrMsg ] = useState('')

    const randomIndex = Math.floor(Math.random() * 99);

    const handleSelectChange = event => setSelectOption(event.target.value);

    useEffect(() => {
        fetch(`http://localhost:3001/${randomIndex}`)
            .then(res => res.json())
            .then(data => setQuote(data.message))
            .catch(err => console.log('Error found', err))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/${selectOption}`)
            .then(res => res.json())
            .then(data => setExampleCategories([...data]))
            .catch(err => console.log(err))
        setIsLoading(false)
    }, [selectOption])

    const addItems = () => {
        const newItems = {
            id: count,
            categoryName: typeOfCategory,
            categoryEmoji: categoryEmoji,
            emojiBgdColor: categoryColor,
            exampleName: categoryChange,
            amountLeft: amountLimitChange - amountSpentChange,
            amountLimit: amountLimitChange,
            amountSpend: amountSpentChange,
            date: dateChange,
            comment: commentChange
        }
        setItemsTransactions(newItems);
        setCount(count + 1);
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(!categoryChange.trim() || !dateChange.trim() || !amountSpentChange.trim() || !amountLimitChange.trim()){
            setErrMsg('All inputs are required');
        }
        addItems();
    }

    if(!show) return null;

  return (
    <>
        <div className="add-transaction-body">
            <div className="add-transaction-wrapper">
                <Cross onClick={onClose}/>
                <p className="add-transaction-quote">'{quote}'</p>
                <form onSubmit={handleSubmit}>
                    <NameInput onChange={event => setCategoryChange(event.target.value)} />
                    <DateInput onChange={event => setDateChange(event.target.value)} />
                    <AmountInput onChange={event => setAmountSpentChange(event.target.value)} />
                    <CommentInput onChange={event => setCommentChange(event.target.value)} />
                    <div className="add-transaction-categories-wrapper">
                        <select name="categories" id="add-transaction-select" value={selectOption} onChange={handleSelectChange}>
                            <option value="fixedExpenses">Fixed Expenses</option>
                            <option value="variableExpenses">Variable Expenses</option>
                            <option value="Savings">Savings</option>
                            <option value="Investments">Investments</option>
                            <option value="Emergencies">Emergencies</option>
                            <option value="Debts">Debts</option>
                            <option value="Givings">Givings</option>
                        </select>
                    </div>
                    <div className="add-transaction-category-example-wrapper">
                        {
                            isLoading ? 
                            <p className="add-transaction-loading-state">loading...</p> :
                            exampleCategories.map((category, index) => 
                                <div key={index} 
                                    onClick={() => { 
                                        setIsPressed(true)
                                        setTypeOfCategory(category.exampleName)
                                        setCategoryColor(category.backgroundColor)
                                        setCategoryEmoji(category.exampleEmoji)
                                    }}
                                >
                                    <div className="add-transaction-category-example" style={{backgroundColor: category.backgroundColor}}>
                                        <div className="add-transaction-emoji">{category.exampleEmoji}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {isPressed &&  <TypeOfCategory text={typeOfCategory} color={categoryColor} />}
                    <div className="add-transaction-amount-limit">
                        <span className="add-transaction-currency">R</span>
                        <input 
                         type="number" 
                         name="amount" 
                         id="add-transaction-amount-limit-input" 
                         placeholder="2000.00" 
                         onChange={event => setAmountLimitChange(event.target.value)} 
                        />
                    </div>
                    <p className="add-transaction-limit">Set Limit..</p>
                    <Create onClick={onClose} />
                    <p className="add-transaction-err-message">{errMsg}</p> 
                </form>
            </div>
        </div>
    </>
  )
}

export default AddTransaction