import React from 'react'
import Navbar from '../../reusable/navbar/navbar.jsx'
import { useState, useEffect } from 'react'
import './report.scss'
import ChartConfig from '../../utils/chartConfig.jsx';
import LoadingState from '../../reusable/loadingState.jsx'
import  bar from '../../assets/Icons/bar.png'
import pie from '../../assets/Icons/pie.png'
import UpdateTransaction from '../modals/updateTransaction.jsx';
import PastTransaction from '../modals/pastTransaction.jsx';
import axios from 'axios'
import useFetchData from '../../utils/api.jsx';


function Report() {
  // TODO a modal for the past transactions without inputs
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [ monthlyTransactions, setMonthlyTransactions ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [currency, setCurrency] = useState('R');
  const [ graph, setGraph ] = useState(pie);
  const [ isBar, setIsBar ] = useState(true);
  const [ showUpdateModal, setShowUpdateModal ] = useState(false);
  const [ showPastModal, setShowPastModal ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState(months[new Date().getMonth()]);
  const [ textCategory, setTextCategory ] = useState();
  const [ bgdColorCategory, setBgdColorCategry ] = useState()
  const [ username ] = useFetchData()
  const [ amountSpent, setAmountSpent ] = useState(0)


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
}


  // TODO in the JSON file put another array of object that is for for monthly transactions for different months 
  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`http://localhost:5000/reports/dashboard`);
      const data = res.data.findLog;
      setMonthlyTransactions(data.transactions);
      data.amountSpent ? setAmountSpent(data.amountSpent) : setAmountSpent(0);
      setIsLoading(false);
    } catch(error){
      console.log('error found:', error)
    }
  }

  useEffect(() => {
        fetchTransactions();
    }, [])

  return (
    <>
        {showUpdateModal && <UpdateTransaction 
                    show={showUpdateModal} 
                    onClose={() => setShowUpdateModal(false)} 
        />}
        {showPastModal && <PastTransaction 
                    show={showPastModal} 
                    onClose={() => setShowPastModal(false)} 
                    text={textCategory}
                    color={bgdColorCategory}
        />}
        <div className="report-body">
          <Navbar />
          <div className="report-wrapper">
            <div className="report-mini-wrapper-one">
              <div className="report-graph-wrapper">
                <div className="report-graph-btns">
                  
                    <select 
                     name="months" 
                     className="report-months-btn"
                     value={selectedOption}
                     onChange={handleSelectChange}
                    >
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  
                  <div className="report-graphs-btn" 
                    onClick={() =>  {
                        if(graph === bar){
                            setIsBar(false);
                            setGraph(pie);
                        }else{
                            setIsBar(true);
                            setGraph(bar);
                        }
                    }}
                  >
                    <img src={graph} alt="icon" />
                  </div>
                </div>
                <div className="report-graph">
                  <ChartConfig states={isBar}/>
                </div>
                <p className="report-results">You spent 
                  <span className="report-amount"> { amountSpent.toFixed(2) } </span>
                  on all expenses
                </p>
              </div>
              <p 
               className="report-months-view"
              >
                {selectedOption}
                <span> {new Date().getFullYear()}</span>
              </p>
              <div className="report-monthly-statements">
                {isLoading ? 
                <LoadingState /> :
                monthlyTransactions.length === 0 ? 
                <p className="no-transaction">No transaction have been made yet..</p> : 
                monthlyTransactions.map((transaction, index) => 
                  <div 
                   key={index}
                   onClick={() => {
                    setShowPastModal(true)
                    setBgdColorCategry(transaction.emojiBgdColor)
                    setTextCategory(transaction.categoryName)
                  }}
                  >
                    <div className="report-statement">
                      <div className="report-amount-spent-percentage" 
                        style={{backgroundColor: transaction.emojiBgdColor}}
                        >{transaction.categoryEmoji}
                      </div>
                      <div className="report-category-name-date">
                        <p className="report-monthly-date">{ transaction.date }</p>
                        <p className="report-monthly-category-name">{ transaction.exampleName }</p>
                      </div>
                      <div className="report-amount-spent">
                        <span className="report-currency">{currency}</span>
                        { transaction.amountSpend }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            <div className="report-mini-wrapper-two">
              <p className="report-recents">Recent</p>
              <div className="report-recents-statement">
                {isLoading ? 
                <LoadingState /> :
                monthlyTransactions.length === 0 ? 
                <p className="no-transaction">No transaction have been made yet..</p> : 
                monthlyTransactions.map((transaction, index) => 
                  <div 
                   key={index}
                   onClick={() =>  setShowUpdateModal(true)}
                  >
                    <div className="report-statement">
                      <div className="report-amount-spent-percentage" 
                        style={{backgroundColor: transaction.emojiBgdColor}}>
                        {transaction.categoryEmoji}
                        </div>
                      <div className="report-category-name-date">
                        <p className="report-monthly-date">{ transaction.date }</p>
                        <p className="report-monthly-category-name">{ transaction.exampleName }</p>
                      </div>
                      <div className="report-amount-spent">
                        <span className="report-currency">{currency}</span>
                        { transaction.amountSpend }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Report   