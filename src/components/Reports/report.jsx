import React from 'react'
import Navbar from '../../reusable/navbar/navbar.jsx'
import { useState, useEffect } from 'react'
import './report.scss'
import ChartConfig from '../../utils/chartConfig.jsx';
import LoadingState from '../../reusable/loadingState.jsx'

function Report() {

  const [ monthlyTransactions, setMonthlyTransactions ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [currency, setCurrency] = useState('R');
  const [ graph, setGraph ] = useState('pie')


  // TODO in the JSON file put another array of object that is for for monthly transactions for different months 
    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3002/0')
            .then(res => res.json())
            .then(data => {
                setMonthlyTransactions([...data.recent]);
                setIsLoading(false)
            })
            .catch(err => err)
    }, [])

  return (
    <>
        <div className="report-body">
          <Navbar />
          <div className="report-wrapper">
            <div className="report-mini-wrapper-one">
              <div className="report-graph-wrapper">
                <div className="report-graph-btns">
                  
                    <select name="months" className="report-months-btn">
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
                    onClick={() => graph === 'pie' ? setGraph('bar') : setGraph('pie')}
                    >{graph}
                  </div>
                </div>
                {/* TODO place a graph here */}
                <div className="report-graph">
                  <ChartConfig />
                </div>
                <p className="report-results">You spent 
                  <span className="report-amount"> R4000.00 </span>
                  on all expenses
                </p>
              </div>
              <p className="report-months-view">January 2022</p>
              <div className="report-monthly-statements">
                {isLoading ? 
                <LoadingState /> :
                monthlyTransactions.length === 0 ? 
                <p className="no-transaction">No transaction have been made yet..</p> : 
                monthlyTransactions.map((transaction, index) => 
                  <div key={index}>
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
                  <div key={index}>
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