import React from 'react'
import Navbar from '../../reusable/navbar/navbar.jsx'
import '../../styles/_variable.scss'
import './settings.scss'
import useLocalStorageName from '../../utils/localStorage.jsx'
import { useNavigate } from 'react-router-dom'

function Settings() {
    const [ removeItems ]  = useLocalStorageName('name');
    const values  = useLocalStorageName('name');
    const navigate = useNavigate();

    // TODO make a fetch req of the flag and the currencies  
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
                    <span className="settings-currency-type">Rand</span>
                    <span className="settings-currency-flag">🚩</span>
                </div>
    
                <label for="income-input" className="settings-income-label">Total Income</label>
                <div className="settings-income-wrapper">
                    <input type="number" id="settings-income-input" placeholder="100.00" />
                </div>
    
                <label for="settings-themes-input" className="settings-themes-label">Themes</label>
                <div className="settings-themes-wrapper">
                    <span className="settings-theme-clr" style={{ backgroundColor: '#00f2ff'}}></span>
                </div>
    
                <button 
                 className="settings-delete-btn" 
                 onClick={() => {
                    removeItems
                    if(values[2] === ''){
                        navigate('/sign')
                    }
                 }}
                >Delete 
                    <span className="settings-username"> {values}</span>
                </button>
            </div>
        </div>
    </>
  )
}

export default Settings