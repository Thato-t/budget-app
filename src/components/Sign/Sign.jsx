import finance_theme_three from '../../assets/images/finance_theme_three.png'
import wave from '../../assets/images/wave.png'
import Dashboard from '../Dashboard/dashboard.jsx'
import './Sign.scss'
import { useEffect, useState } from 'react' 
import useLocalStorageName from '../../utils/localStorage'
import { Link } from 'react-router-dom'

function Sign(){

    const [ setItems ] = useLocalStorageName('name');
    const [ name, setName ] = useState('');

    const onChange = (event) => {
        setName(event.target.value);
    }
    return(
        <>
            <div className="body">
                <p className="logo">Expensify</p>
                <div className="sign-wrapper">
                    <div className="left-mini-wrapper">
                        <p className="title">Enjoy Making Your <span className="budgeting">Budgeting</span></p>
                        <p className="description">Personal budgeting is the secret to financial freedom. Start your journey today.</p>
                        <img src={finance_theme_three} alt="undraw-finance" className="illustration" />
                    </div> 
                    <div className="right-mini-wrapper">
                        <div className="input-wrapper">
                            <input type="text" id="input" className="input" 
                            placeholder="What is your name?"
                            onChange={() => onChange(event)}
                            /><br></br>
                        </div>
                        {/* Must put an icon of a head or person inside the btn */}
                        <Link to="/">
                            <button id="btn" className="btn"
                            onClick={() => setItems(name)}
                            >Create Account</button>
                        </Link>
                    </div>
                </div>
                <img src={wave} alt="wave" className="wave" />
            </div>
        </>
    )
}
export default Sign