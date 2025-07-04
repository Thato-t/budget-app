import React from 'react'
import { useState, useEffect } from 'react'
import './updateTransaction.scss'
import Cross from '../../reusable/buttons/cross.jsx'
import AmountInput from '../../reusable/inputs/amountInput.jsx'
import NameInput from '../../reusable/inputs/nameInput.jsx'
import DateInput from '../../reusable/inputs/dateInput.jsx'
import CommentInput from '../../reusable/inputs/commentInput.jsx'
import Create from '../../reusable/buttons/create.jsx'
import TypeOfCategory from '../../reusable/typeOfCategory.jsx'
import LoadingState from '../../reusable/loadingState.jsx'
import axios from 'axios';
import useHelpers from '../../utils/helpers.jsx';


function UpdateTransaction({ show, onClose, text, color }) {

    const [ prevTrans, setPrevTrans ] = useState([])
    const [ prevImg, setPrevImg] = useState();
    const [ comment, setComment ] = useState();
    const [ cardHeading, setIsCardHeading ] = useState();
    const [ amount, setIsAmount ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ categoryChange, setCategoryChange ] = useState('');
    const [ dateChange, setDateChange ] = useState('');
    const [ amountSpentChange, setAmountSpentChange ] = useState('');
    const [ commentChange, setCommentChange ] = useState('');
    const [ errMsg, setErrMsg ] = useState('')
    const [categoryColor, setCategoryColor ] = useState()
    const [category, setCategory ] = useState()
    const [ getTotalIncome, getAmountLeft, getTotalExpense ] = useHelpers()

    const fetchPrevTransData = async () => {
        setIsLoading(true)
        try{
            const res = await axios.get('http://localhost:5000/getTransactions')
            const data = res.data.findAmounts.transactions;
            const selected = data.filter(item => item.categoryName === text)
            setPrevTrans(selected)
            setIsLoading(false)
        } catch (error){
            console.error('Error found:', error)
        }
    }

    useEffect(() => {
        fetchPrevTransData();
    }, [])
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!categoryChange.trim() || !dateChange.trim() || !amountSpentChange.trim()){
            setErrMsg('All inputs are required');
            return
        }
        try{
            const res = await axios.post('http://localhost:5000/add/transaction', {
                typeOfCategory,
                categoryEmoji,
                categoryColor,
                categoryChange,
                amount,
                amountLimitChange,
                amountSpentChange,
                dateChange,
                commentChange
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
        <div className="update-trans-body">
            <div className="update-trans-wrapper">
                <form onSubmit={handleSubmit}>
                    <Cross onClick={onClose} />
                    <TypeOfCategory text={text} color={color} />
                    <div className="update-trans-containers">
                        <div className="update-trans-container-one">
                            <NameInput onChange={event => setCategoryChange(event.target.value)} />
                            <DateInput onChange={event => setDateChange(event.target.value)} />
                            <AmountInput onChange={event => setAmountSpentChange(event.target.value)} />
                            <CommentInput onChange={event => setCommentChange(event.target.value)} />
                            <p className="update-trans-prev">Previous Transactions</p>
                            { isLoading ? <LoadingState/> :
                                <div className="update-trans-prev-trans">
                                    {
                                        prevTrans.map((prevTran, index) => 
                                            <div 
                                                className="update-trans-prev-rows"
                                                key={index}
                                                onClick={() => {
                                                    setComment(prevTran.comment)
                                                    setIsAmount(prevTran.amountSpend)
                                                    setCategoryColor(prevTran.emojiBgdColor)
                                                    setIsCardHeading(prevTran.exampleName)
                                                    setPrevImg(prevTran.categoryEmoji)

                                                }}
                                            >
                                                <span className="update-trans-clr" style={{backgroundColor: prevTran.emojiBgdColor}}>{ prevTran.categoryEmoji }</span>
                                                <span className="update-trans-date-comment">
                                                    <p className="update-trans-date">{ prevTran.date }</p>
                                                    <p className="update-trans-comment" >{prevTran.exampleName} </p>
                                                </span>
                                                <div className="update-trans-amount-currency">
                                                    <span className="update-trans-currency">R</span>
                                                    <span 
                                                    className="update-trans-amount">{ (prevTran.amountSpend).toFixed(2) }</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                }
                        </div>
                        <div className="update-trans-container-two">
                            <div className="update-prev-card">
                                <h3 className="update-trans-card-heading">
                                    <div className="update-prev-card-clr" style={{ backgroundColor: categoryColor}}>{ prevImg}</div>
                                    {cardHeading}
                                </h3>
                                <p className="update-prev-statement">{comment}</p>
                                <p className="update-prev-card-amount">R{amount}</p>
                            </div>
                        </div>
                    </div>
                    <Create onClick={onClose} />
                    <p className="update-transaction-err-message">{errMsg}</p> 
                </form>
            </div>
        </div>
    </>
  )
}

export default UpdateTransaction