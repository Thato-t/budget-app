import finance_theme_three from '../../assets/images/finance_theme_three.png'
import takeway_cup from '../../assets/Icons/takeway_cup.png'
import wave from '../../assets/images/wave.png'
import './Sign.scss'
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import dashboardDesktop from '../../assets/images/dashboard-desktop.png';
import dashboardMobile from '../../assets/images/dashboard-mobile.png';
import reportDesktop from '../../assets/images/report-desktop.png';
const backendURL = import.meta.env.VITE_BACKEND_URI;

function Sign(){
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const navigate = useNavigate();
    const getLocalEmail = localStorage.getItem('email');

    const verifyEmail = (email) => {
        const emailRegex = /[a-z0-9?]@gmail\.com/;
        const validEmail = emailRegex.test(email);
        return validEmail
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(username.trim() === '' && email.trim() === ''){
            setErrMsg('All inputs are required');
            return
        }
        if(!verifyEmail(email)){
            setErrMsg(`Email format must be user@email.com`);
            return
        }
        try{
            const newUser = await axios.post(`${backendURL}/${username}`, { username, email });
            localStorage.setItem('email', JSON.stringify(email));
            setErrMsg('Loading.....');
            navigate('/home');
        }catch(error){
            console.error(error);
            setErrMsg('Error, Try again');
        }
    }


    
    return(
        <>
            <div className="body">
                <p className="logo">Expensify</p>
                <div className="sign-landing-wrapper">
                    <div className="landing-content">
                        <h1 className="landing-title">
                            Enjoy Making Your <span className="budgeting">Budget</span>
                        </h1>
                        <p className="landing-description">
                            Personal budgeting is the secret to financial freedom.<br />
                            Start your journey today with Expensify.
                        </p>
                        <ul className="feature-list">
                            <li>Track your expenses effortlessly</li>
                            <li>Visualize your spending with beautiful charts</li>
                            <li>Set savings goals and stay on target</li>
                        </ul>
                        <div className="landing-images">
                            <img src={dashboardDesktop} alt="Dashboard Desktop" />
                            <img src={dashboardMobile} alt="Dashboard Mobile" />
                            <img src={reportDesktop} alt="Report Desktop" />
                        </div>
                    </div>
                    <div className="sign-form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="right-mini-wrapper">
                                <div 
                                    className="input-wrapper username-bar"
                                    style={{ display: getLocalEmail ? 'none' : 'flex'}}
                                >
                                    <input 
                                        type="text" 
                                        id="input" 
                                        className="input" 
                                        placeholder="What is your username?"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        style={{ display: getLocalEmail ? 'none' : 'flex'}}
                                    /><br />
                                </div>
                                <div className="input-wrapper email-bar">
                                    <input 
                                        type="text" 
                                        id="input" 
                                        className="input" 
                                        placeholder="What is your email?"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    /><br />
                                </div>
                                <p className="sign-error">{errMsg}</p>
                                <button type="submit" id="btn" className="btn">
                                    <img src={takeway_cup} alt={takeway_cup} className="takeway_cup" />
                                    Get Started
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={wave} alt="wave" className="wave" />
            </div>
        </>
    );
}
export default Sign;