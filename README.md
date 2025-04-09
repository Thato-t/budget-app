# Still in production


<!-- @use '../../styles/_variable' as *;
@use '../../styles/_mixins' as *;
@use '../Dashboard/dashboard.scss' as *;

*,
*::before,
*::after{
    @include boxSizing();
    // outline:2px solid red;
}
.report-wrapper{
    @extend .dashboard-wrapper;
    @include flex-space-between();
    gap:25px;
}
.report-graph-wrapper{
    @extend .graphs-wrapper; 
}
.report-mini-wrapper-one{
    width:50%
}
.report-graph-btns{
    @extend .types;
    gap:10px;
    align-items:start;
}
.report-months-btn{
    cursor:pointer;
    border-radius:6px;
    font-size:.9rem;
    font-weight:200;
    background-color:$lightPrimary;
    height:40px;
    @include p-bgd-br();
    outline:none;
    margin-bottom:9px;
    border:none;
}
.report-graphs-btn{
    font-size:.9rem;
    @extend .type-of-graph; 
    height:40px;
    display:flex;
    align-items:center;
}
.report-graph{
    margin-top:0px;
    height:176px;
}
.report-results{
    margin-top:25px;
    width:18ch;
    text-align:center;
    font-size:.8rem;
    margin-inline:auto;
}
.report-amount{
    font-weight:700;
}
.report-months-view{
    margin-bottom:8px;
    font-size:.8rem;
}
.report-monthly-statements{
    @extend .recent-trans;
}
.no-transaction{
    width:fit-content;
    margin-inline:auto;    
    color:$lightTextHover
}
.report-statement{
    @extend .recent-rows;
}
.report-amount-spent-percentage{
    @extend .emoji-box;
}
.report-category-name-date{
    width:200px;
    margin-left:-104px
}
.report-monthly-date{
    font-size:.7rem;
    color:$lightTextHover
}
.report-monthly-category-name{
    font-weight:700;
}
.report-amount-spent{
    width:150px;
    text-align:end
}
.report-mini-wrapper-two{
    width:50%;
}
.report-recents{
    margin-left:7px;
    margin-bottom:20px;
}


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

export default Report    -->