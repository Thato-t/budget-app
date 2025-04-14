import React from 'react'
import { useState, useEffect } from 'react'
import Cross from '../../reusable/buttons/cross.jsx'
import TypeOfCategory from '../../reusable/typeOfCategory.jsx'
import './pastTransaction.scss'
import LoadingState from '../../reusable/loadingState.jsx'

function PastTransaction({ show, onClose, text, color }){

        const [ prevTrans, setPrevTrans ] = useState([])
        const [ prevImg, setPrevImg] = useState();
        const [ comment, setComment ] = useState('All my wheels got punsched');
        const [ cardHeading, setCardHeading ] = useState('Towing Service');
        const [ amount, setAmount ] = useState();
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

    return(
        <>
            <div className="past-trans-body">
                <div className="past-trans-wrapper">
                    <Cross onClick={onClose} />
                    <TypeOfCategory text={text} color={color}/>
                    <div className="past-trans-containers">
                        <div className="past-trans-container-one">
                            <p className="past-trans-prev">Past Transactions</p>
                            { isLoading ? <LoadingState /> : 
                                <div className="past-trans-prev-trans">
                                    {
                                        prevTrans.map((prevTran, index) => 
                                            <div 
                                                className="past-trans-prev-rows"
                                                key={index}
                                                onClick={() => {
                                                    setCardHeading('Towing service')
                                                    setAmount(prevTran.amountSpend)
                                                }}
                                            >
                                                <span className="past-trans-clr" style={{backgroundColor:'red'}}>{ prevImg }</span>
                                                <span className="past-trans-date-comment">
                                                    <p className="past-trans-date">{ prevTran.date }</p>
                                                    <p className="past-trans-comment" >{cardHeading} </p>
                                                </span>
                                                <div className="past-trans-amount-currency">
                                                    <span className="past-trans-currency">R</span>
                                                    <span 
                                                        className="past-trans-amount">{ (prevTran.amountSpend).toFixed(2) }</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                        <div className="past-trans-container-two">
                            <div className="past-prev-card">
                                <h3 className="past-trans-card-heading">
                                    <div className="past-prev-card-clr" style={{ backgroundColor: 'red'}}>{ prevImg }</div>
                                    {cardHeading}
                                </h3>
                                <p className="past-prev-statement">{comment}</p>
                                <p className="past-prev-card-amount">R{amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PastTransaction