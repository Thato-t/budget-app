import React, { useEffect, useState } from 'react'
import './addTransaction.scss'
import AmountInput from '../../reusable/inputs/amountInput.jsx'
import NameInput from '../../reusable/inputs/nameInput.jsx'
import DateInput from '../../reusable/inputs/dateInput.jsx'
import CommentInput from '../../reusable/inputs/commentInput.jsx'
import Cross from '../../reusable/buttons/cross.jsx'
import Create from '../../reusable/buttons/create.jsx'
import TypeOfCategory from '../../reusable/typeOfCategory.jsx'
import axios from 'axios'
import useHelpers from '../../utils/helpers.jsx'
import useLocalStorage from '../../hooks/localStorage.jsx'
const backend_URL = import.meta.env.BACKEND_URI || 'http://localhost:5000';

function AddTransaction({ show, onClose }) {

    const [ quote, setQuote ] = useState();
    const [ exampleCategories, setExampleCategories ] = useState([]);
    const [ category, setCategory ] = useState();
    const [ selectOption, setSelectOption] = useState('fixedExpenses');
    const [ isPressed, setIsPressed ] = useState(false);
    const [ typeOfCategory, setTypeOfCategory ] = useState();
    const [ categoryColor, setCategoryColor ] = useState();
    const [ isLoading, setIsLoading ] = useState(false) 
    const [ count, setCount] = useState(1);
    const [ categoryChange, setCategoryChange ] = useState('');
    const [ dateChange, setDateChange ] = useState('');
    const [ amountSpentChange, setAmountSpentChange ] = useState('');
    const [ commentChange, setCommentChange ] = useState('');
    const [ amountLimitChange, setAmountLimitChange ] = useState('');
    const [ categoryEmoji, setCategoryEmoji ] = useState();
    const  [ errMsg, setErrMsg ] = useState('')
    const  [ amountLeft, setAmountLeft ] = useState('')
    const [ getTotalIncome, getTotalExpense, getAmountLeft ] = useHelpers();
    const localStrEmail = useLocalStorage();

    const randomIndex = Math.floor(Math.random() * 99);

    const handleSelectChange = event => setSelectOption(event.target.value);
//  MAKE THE QUOTE BECOME AI GENERATED WHICH THE AI WILL DETECT HOW MUCH THE MONEY IS AND GIVES QUOTE BASED ON THE AMOUNT
    // useEffect(() => {
    //     fetch(`${backend_URL}:3001/${randomIndex}`)
    //         .then(res => res.json())
    //         .then(data => setQuote(data.message))
    //         .catch(err => console.log('Error found', err))
    // }, [])

    const fetchCategoriesData = async () => {
        setIsLoading(true)
        try{
            const res = await axios.get(`${backend_URL}/transaction/categories`)
            setExampleCategories(res.data.cat[0][selectOption])
            setIsLoading(false);
        } catch(err){
            console.error(err, 'found')
        }
    }

    useEffect(() => {
        fetchCategoriesData();
    }, [selectOption, localStrEmail])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const amount = amountLimitChange - amountSpentChange
        if(!categoryChange.trim() || !dateChange.trim() || !amountSpentChange.trim() || !amountLimitChange.trim()){
            setErrMsg('All inputs are required');
            return
        }
        if(amountLimitChange < amountSpentChange){
            setErrMsg('The amount your spending is more than the limit');
            return
        }
        if(amountLimitChange > getTotalIncome){
            setErrMsg('You have less money in your account to spend.')
            setTimeout(() => {
                if(!getAmountLeft){
                    setErrMsg(`Remaining amount is R${getTotalIncome}`);
                }else{
                    setErrMsg(`Remaining amount is R${getAmountLeft}`);
                }
            }, 2000);
            return
        }
        try{
            const res = await axios.post(`${backend_URL}/add/transaction/${localStrEmail}`, {
                typeOfCategory,
                categoryEmoji,
                categoryColor,
                categoryChange,
                amount,
                amountLimitChange,
                amountSpentChange,
                dateChange,
                commentChange,
                selectOption
            });
            console.log('transaction saved')
        } catch(err){
            console.error('Error saving transaction', err)
        }
        onClose();
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
                    <Create />
                    <p className="add-transaction-err-message">{errMsg}</p> 
                </form>
            </div>
        </div>
    </>
  )
}

export default AddTransaction