import React from 'react'
import { useState, useEffect } from 'react'
import Cross from '../../reusable/buttons/cross.jsx'
import TypeOfCategory from '../../reusable/typeOfCategory.jsx'
import './pastTransaction.scss'
import LoadingState from '../../reusable/loadingState.jsx'
import axios from 'axios'

function PastTransaction({ show, onClose, text, color }){

        const [ prevTrans, setPrevTrans ] = useState([])
        const [ prevImg, setPrevImg] = useState();
        const [ comment, setComment ] = useState();
        const [ cardHeading, setIsCardHeading ] = useState();
        const [ amount, setIsAmount ] = useState();
        const [ isLoading, setIsLoading ] = useState(false);
        const [ categoryColor, setCategoryColor ] = useState()
        const [ category, setCategory ] = useState()



    const fetchPrevTransData = async () => {
        setIsLoading(true)
        try{
            const res = await axios.get('http://localhost:5000/getTransactions')
            setPrevTrans(res.data.findAmounts.transactions)
            setIsLoading(false)
        } catch (error){
            console.error('Error found:', error)
        }
    }

    useEffect(() => {
        fetchPrevTransData();
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
                                                    setComment(prevTran.comment)
                                                    setIsAmount(prevTran.amountSpend)
                                                    setCategoryColor(prevTran.emojiBgdColor)
                                                    setIsCardHeading(prevTran.exampleName)
                                                    setPrevImg(prevTran.categoryEmoji)
                                                }}
                                            >
                                                <span className="past-trans-clr" style={{backgroundColor: prevTran.emojiBgdColor}}>{ prevTran.categoryEmoji }</span>
                                                <span className="past-trans-date-comment">
                                                    <p className="past-trans-date">{ prevTran.date }</p>
                                                    <p className="past-trans-comment" >{prevTran.exampleName} </p>
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
                                    <div className="past-prev-card-clr" style={{ backgroundColor: categoryColor}}>{ prevImg }</div>
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