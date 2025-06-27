import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../../reusable/navbar/navbar.jsx'
import '../../styles/_variable.scss'
import './settings.scss'
import useFetchData from '../../utils/api.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import flag from '../../assets/images/flag.png'

function Settings() {
    const navigate = useNavigate();
    const [username] = useFetchData();
    const [ currency, setCurrency ] = useState('Rands')
    const [ flagImage, setFlagImage ] = useState(flag)
    const [ totalIncome, setTotalIncome ] = useState('')
    // TODO make a fetch req of the flag and the currencies  

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:5000/settings/users/${username}`, {data: username});
            alert(`Are you sure you want delete the account ${username}`);
            console.log('Account deleted') 
            navigate('/');  
        } catch (error) {
            console.error('Error found', error)
        }
        
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/settings/amounts/${username}`, 
                {
                    totalIncome,
                    currency,
                    flagImage
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