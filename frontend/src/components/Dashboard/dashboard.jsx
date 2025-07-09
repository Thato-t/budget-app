import { useState, useEffect } from 'react';
import Navbar from '../../reusable/navbar/navbar.jsx';
import './dashboard.scss';
import useFetchData from '../../utils/api.jsx';
import useLocalStorage from '../../hooks/localStorage.jsx';
import LoadingState from '../../reusable/loadingState.jsx';
import AddTransaction from '../modals/addTransaction.jsx';
import UpdateTransaction from '../modals/updateTransaction.jsx';
import ChartConfig from '../../utils/chartConfig.jsx';
import  bar from '../../assets/Icons/bar.png'
import pie from '../../assets/Icons/pie.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const backendURL = import.meta.env.VITE_BACKEND_URI;


function Dashboard() {
    const navigate = useNavigate();
    const [ isLoadingRecents, setIsLoadingRecents ] = useState(false);
    const [ isLoadingCategory, setIsLoadingCategory ] = useState(false);
    const [recents, setRecents] = useState([]); 
    const [transactions, setTransactions] = useState([]);
    const [ title, setTitle ] = useState('fixedExpense');  
    const [ username, sendErrMsg, email ] = useFetchData();
    const [ countriesCurrency, setCountriesCurrency ] = useState('R');
    const [ graph, setGraph ] = useState(pie);
    const [ showAddModal, setShowAddModal ] = useState(false)
    const [ showUpdateModal, setShowUpdateModal ] = useState(false)
    const [ isBar, setIsBar ] = useState(true)
    const [ textCategory, setTextCategory ] = useState();
    const [ textCategoryExample, setTextCategoryExample ] = useState();
    const [ bgdColorCategory, setBgdColorCategry ] = useState()
    const [ totalIncome, setTotalIncome ] = useState(0);
    const [ remainingBudget, setRemainingBudget ] = useState(0);
    const [ totalExpense, setTotalExpense]  = useState(0);
    const localStrEmail  = useLocalStorage();

    // Make the bar and pie image persistent in localStorage

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleSelectChange = (event) => {
        setTitle(event.target.value)
    }
    
    
    
    const fetchExpensesData = async () => {
        setIsLoadingRecents(true)
        console.log(localStrEmail)
        try {
            const res = await axios.get(`${backendURL}/home/dashboard/${localStrEmail}`)
            console.log(res)
            setRecents(res.data.findLog.transactions);
            setIsLoadingRecents(false)
        } catch (error) {
            console.error(`Error found: ${error}`);
        }
    }

    const fetchCategoriesData = async () => {
        setIsLoadingCategory(true)
        try {
            const res = await axios.get(`${backendURL}/home/dashboard/${localStrEmail}`)
            const data =  res.data.findLog.transactions;
            const selected = data.filter(item => item.selectOption === title)
            setTransactions(selected)
            setIsLoadingCategory(false) 
        } catch (error) {
            console.error(`Error found: ${error}`);
        }
    }

    const fetchAmountsData = async () => {

        try {            
            const res = await axios.get(`${backendURL}/home/dashboard/${localStrEmail}`);
            const data = res.data.findLog
            console.log(data);
            if (data.totalIncome){
                setRemainingBudget(data.amountLeft);
                setTotalExpense(data.totalExpense);
                setTotalIncome(data.totalIncome)
            }
        } catch (error) {
            console.error('Error found', error)
        }
    }
    
    useEffect(() => {
        fetchExpensesData();
        fetchCategoriesData();
        fetchAmountsData();
    }, [title, localStrEmail])
    
    
    // styles the percentage and the progress circles
    const getCircleColor = (totalAmount, amountSpent) => {
        const remaining = totalAmount - amountSpent;
        const percentage = ((remaining / totalAmount) * 100).toFixed(2);
        if(percentage > (80).toFixed(2)) return '#4CAF50'
        if(percentage > (60).toFixed(2)) return '#00BCD4'
        if(percentage > (40).toFixed(2)) return '#FFEB3B'
        if(percentage > (20).toFixed(2)) return '#FF5722'
        if(percentage >= (0).toFixed(2)) return '#F44336'
    }

    const getPercentageColor = (totalAmount, amountSpent) => {
        const remaining = totalAmount - amountSpent;
        const percentage = ((remaining / totalAmount) * 100).toFixed(2);
        if(percentage > (80).toFixed(2)) return '#4CAF50'
        if(percentage > (60).toFixed(2)) return '#00BCD4'
        if(percentage > (40).toFixed(2)) return '#FFEB3B' 
        if(percentage > (20).toFixed(2)) return '#FF5722'
        if(percentage >= (0).toFixed(2)) return '#F44336'
    }

    // alert(`From now on get started using this localStrEmail} as your name`)

  return ( 
    <>  
        {showAddModal && <AddTransaction 
            show={showAddModal} 
            onClose={() => setShowAddModal(false)} 
        />}
        {/* TODO: Make it possible for users to update their transactions */}
        {/* {showUpdateModal && <UpdateTransaction 
            show={showUpdateModal} 
            onClose={() => setShowUpdateModal(false)} 
            text={textCategory}
            color={bgdColorCategory}
        />} */}

        <div className="body">
            <Navbar className="navbar"/>
            <div className="dashboard-wrapper">
                <h1 className="heading">Welcome <span className="username" >{ username } </span></h1>
                <div className="containers">
                    <div className="dashboard-containerOne">
                        {/* CARD */}
                        <div className="card">
                            <div className="firstHalf">
                                <div className="remaining-budget">
                                    <p className="card-texts">Remaining Budget</p>
                                    <p className="card-numbers"><span className="currency">{countriesCurrency}</span>{(remainingBudget).toFixed(2)}</p>
                                </div>
                                <div className="amount-color"
                                 style={{backgroundColor:getCircleColor(totalIncome, totalExpense)}}
                                ></div>
                            </div>
                            <div className="secondHalf">
                                <div className="total-income">
                                    <p className="card-texts">Total Income</p>
                                    <p className="card-numbers"><span className="currency">{countriesCurrency}</span>{(totalIncome).toFixed(2)}</p>
                                </div>
                                <div className="total-expense">
                                    <p className="card-texts">Total Expense</p>
                                    <p className="card-numbers"><span className="currency">{countriesCurrency}</span>{(totalExpense).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        {/* RECENT TRANSACTIONS */}

                        <p className="recent">Recent</p>
                        <div className="recent-trans">
                            { isLoadingRecents ? 
                            <LoadingState message={sendErrMsg}/> 
                            : !recents.length ?
                            <div className="recent-empty-recents">
                                <p className="recent-explanation-one">All your recents transactions will show up here</p>
                                <p className="recent-explanation-two">Start with (+) to create first one</p>
                            </div> 
                            : recents.map((recent, index) => 
                                <div 
                                  className="recent-rows"
                                  key={index}
                                  onClick={() =>  { 
                                    setShowUpdateModal(true)
                                    setBgdColorCategry(recent.emojiBgdColor)
                                    setTextCategoryExample(recent.exampleName)
                                    setTextCategory(recent.categoryName)
                                }}
                                >
                                    <div className="emoji-box" style={{backgroundColor: recent.emojiBgdColor}}>{recent.categoryEmoji}</div>
                                    <p className="example-name">{recent.exampleName}</p>
                                    <p className="amount-left"><span className="currency">{countriesCurrency}</span>{(recent.categoryLimit).toFixed(2)}</p>
                                    <div className="amount-left-color" style={{backgroundColor:getCircleColor(recent.categoryLimit, recent.amountSpend)}}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="dashboard-containerTwo">
                        <div className="graphs-wrapper">
                            <div className="types">
                                <span className="months">
                                    {months[new Date().getMonth()]}
                                </span>
                                <span className="type-of-graph" 
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
                                </span>
                            </div>
                            <div className="graphs">
                                <ChartConfig  states={isBar} />
                            </div>
                        </div>
                        {/* FIND ICON FOR THE BTN */}
                        <div className="add-expense-btn"
                            onClick={() => setShowAddModal(true)}
                        >
                            +
                        </div>
                       
                    </div>

                    <div className="dashboard-containerThree">
                        <div className="categories fixedCategory">
                            
                            <select 
                             className="categoryName" 
                             value={title} 
                             onChange={handleSelectChange}
                            >
                                <option className="dashboard-categories-names" value="fixedExpenses">Fixed Expenses</option>
                                <option className="dashboard-categories-names" value="variableExpenses">Variable Expenses</option>
                                <option className="dashboard-categories-names" value="savings">Savings</option>
                                <option className="dashboard-categories-names" value="investments">Investments</option>
                                <option className="dashboard-categories-names" value="emergencies">Emergencies</option>
                                <option className="dashboard-categories-names" value="debts">Debts</option>
                                <option className="dashboard-categories-names" value="givings">Givings</option>
                            </select>
                            { isLoadingCategory ?
                            <LoadingState /> 
                            : !transactions.length ?
                            <div className="dashboard-empty-transactions">
                                <p className="empty-transactions-explanation-one">All your transactions will show up here</p>
                                <p className="empty-transactions-explanation-two">Start with (+) to create first one</p>
                            </div> 
                            : transactions.map((category, index) => 
                                <div 
                                  className="categoryExample"  
                                  key={index}
                                  onClick={() => { 
                                    setShowUpdateModal(true)
                                    setBgdColorCategry(category.emojiBgdColor)
                                    setTextCategoryExample(category.exampleName)
                                    setTextCategory(category.categoryName)
                                }}
                                >
                                    <div className="semi-category">
                                        <div className="category-emoji" 
                                            style={{backgroundColor: category.emojiBgdColor}}>{category.categoryEmoji}</div>
                                        <p className="category-example">{category.exampleName}</p>
                                        <p className="example-limit">
                                            <span className="currency">{countriesCurrency}</span>
                                            {(category.categoryLimit).toFixed(2)}
                                        </p>
                                        <p className="example-amount-left">
                                            <span className="currency">{countriesCurrency}</span>
                                            {(category.amountSpend).toFixed(2)}
                                        </p>
                                    </div>
                                    <p className="percentage-left" 
                                    style={{ color: getPercentageColor(category.categoryLimit, category.amountSpend)}}>{
                                    (((category.categoryLimit - category.amountSpend) / category.categoryLimit) * 100).toFixed(2)
                                    }%
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </>
  )
}

export default Dashboard