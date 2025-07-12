import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../../reusable/navbar/navbar.jsx'
import '../../styles/_variable.scss'
import './settings.scss'
import useFetchData from '../../utils/api.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import flag from '../../assets/images/flag.png'
import useHelpers from '../../utils/helpers.jsx'
import useLocalStorage from '../../hooks/localStorage.jsx'

function Settings() {
    const navigate = useNavigate();
    const [username, email] = useFetchData();
    const localStrEmail = useLocalStorage();
    const [ currency, setCurrency ] = useState('Rands')
    const [ flagImage, setFlagImage ] = useState(flag)
    const [ totalIncome, setTotalIncome ] = useState('')
    const [ getTotalIncome, getAmountLeft, getTotalExpense ] = useHelpers();
    const backendURL = import.meta.env.VITE_BACKEND_URI;

    // TODO make a fetch req of the flag and the currencies  

    const handleDelete = async (event) => {
        event.preventDefault();
        alert(`Are you sure you want delete the account ${username}`);
        try {
            navigate('/');  
            console.log('Account deleted') 
            // check if is necessary to make a key value for delete with a key of data for each value
            localStorage.removeItem('email');
            const res = await axios.delete(`${backendURL}/user/delete/${localStrEmail || email}`, { username, email});
        } catch (error) {
            console.error('Error found', error)
        }
        
    }


    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${backendURL}/settings/amounts/${localStrEmail || email}`, 
                {
                    totalIncome: parseInt(totalIncome) + parseInt(getTotalIncome),
                    currency,
                    flagImage,
                    totalExpense: parseInt(getTotalExpense),
                    amountLeft: parseInt(getAmountLeft)
                }
            )
            console.log('money saved')
            navigate('/home')

        } catch (error) {
            console.error('Error found', error);
        }
    }


  return (
    <>
        <div className="settings-body">
            <Navbar />
            <div className="settings-wrapper">
                <h1 className="settings-heading">
                    Enjoying How The
                    <span className="settings-budget-word" style={{color:  '#00f2ff'}}> Budget </span>
                     Is
                    <span className="settings-going-word" style={{color:  '#00f2ff'}}> Going</span>
                </h1>
    
                <label htmlFor="currency-input" className="settings-currency-label">Currency</label>
                <div className="settings-currency-wrapper">
                    <span className="settings-currency-type">{currency}</span>
                    <img src={flagImage} className="settings-currency-flag" />
                </div>
                <form onSubmit={(event) => handleUpdate(event)}>
                    <label htmlFor="income-input" className="settings-income-label">Total Income</label>
                    <div className="settings-income-wrapper">
                        <input 
                         type="number" 
                         id="settings-income-input" 
                         placeholder="100.00" 
                         value={totalIncome} 
                         onChange={(event) => setTotalIncome(event.target.value)}
                        />
                    </div>
        
                    <label htmlFor="settings-themes-input" className="settings-themes-label">Themes</label>
                    <div className="settings-themes-wrapper">
                        <span className="settings-theme-clr" style={{ backgroundColor: '#00f2ff'}}></span>
                    </div>
        
                    <button 
                     className="settings-delete-btn btn" 
                     onClick={(event) => handleDelete(event)}
                    >Delete 
                        <span className="settings-username"> {username}</span>
                    </button>

                    <button 
                     className="settings-update-btn btn" 
                    >Update 
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Settings