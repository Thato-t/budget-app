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
    const [ totalIncome, setTotalIncome ] = useState()
    // TODO make a fetch req of the flag and the currencies  

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.delete('http://localhost:5000/', {data: username});
            console.log('Account deleted')
        } catch (error) {
            console.error('Error found', error)
        }

    }

    const update = async () => {
        try {
            const res = await axios.post('http://localhost:5000/amounts', 
                {
                    totalIncome,
                    currency,
                    flagImage
                }
            )

        } catch (error) {
            console.error('Error found', error);
        }
        navigate('/home')
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
    
                <label for="currency-input" className="settings-currency-label">Currency</label>
                <div className="settings-currency-wrapper">
                    <span className="settings-currency-type">{currency}</span>
                    <img src={flagImage} className="settings-currency-flag" />
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="income-input" className="settings-income-label">Total Income</label>
                    <div className="settings-income-wrapper">
                        <input 
                         type="number" 
                         id="settings-income-input" 
                         placeholder="100.00" 
                         value={totalIncome} 
                         onChange={(event) => setTotalIncome(event.target.value)}
                        />
                    </div>
        
                    <label for="settings-themes-input" className="settings-themes-label">Themes</label>
                    <div className="settings-themes-wrapper">
                        <span className="settings-theme-clr" style={{ backgroundColor: '#00f2ff'}}></span>
                    </div>
        
                    <button 
                    className="settings-delete-btn btn" 
                    onClick={() => {
                        alert(`Are you sure you want delete the account ${username}`);
                        localStorage.removeItem('username');
                        navigate('/');  
                    }}
                    >Delete 
                        <span className="settings-username"> {username}</span>
                    </button>

                    <button 
                     className="settings-update-btn btn" 
                     onClick={update()}
                    >Update 
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Settings