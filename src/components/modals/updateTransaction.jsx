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


function UpdateTransaction({ show, onClose, text, color }) {

    const [ prevTrans, setPrevTrans ] = useState([])
    const [ prevImg, setPrevImg] = useState();
    const [ comment, setIsComment ] = useState('All my wheels got punsched');
    const [ cardHeading, setIsCardHeading ] = useState('Towing Service');
    const [ amount, setIsAmount ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3002/0')
            .then(res => res.json())
            .then(data => {
                setPrevTrans([...data.recent])
                setIsLoading(false)
            })
            .catch(err => err)
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/Emergencies')
            .then(res => res.json())
            .then(data => {
                setPrevImg(data[2].exampleEmoji)
            })
            .catch(err => console.log(err))
    }, [])
    
    if(!show) return null;

  return (
    <>
        <div className="update-trans-body">
            <div className="update-trans-wrapper">
                <Cross onClick={onClose} />
                <TypeOfCategory text={text} color={color} />
                <div className="update-trans-containers">
                    <div className="update-trans-container-one">
                        <NameInput />
                        <DateInput />
                        <AmountInput />
                        <CommentInput />
                        <p className="update-trans-prev">Previous Transactions</p>
                        { isLoading ? <LoadingState/> :
                            <div className="update-trans-prev-trans">
                                {
                                    prevTrans.map((prevTran, index) => 
                                        <div 
                                            className="update-trans-prev-rows"
                                            key={index}
                                            onClick={() => {
                                                setIsCardHeading('Towing service')
                                                setIsAmount(prevTran.amountSpend)
                                            }}
                                        >
                                            <span className="update-trans-clr" style={{backgroundColor:'red'}}>{ prevImg }</span>
                                            <span className="update-trans-date-comment">
                                                <p className="update-trans-date">{ prevTran.date }</p>
                                                <p className="update-trans-comment" >{cardHeading} </p>
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
                                <div className="update-prev-card-clr" style={{ backgroundColor: 'red'}}>{ prevImg }</div>
                                {cardHeading}
                            </h3>
                            <p className="update-prev-statement">{comment}</p>
                            <p className="update-prev-card-amount">R{amount}</p>
                        </div>
                    </div>
                </div>
                <Create onClick={onClose} />
            </div>
        </div>
    </>
  )
}

export default UpdateTransaction