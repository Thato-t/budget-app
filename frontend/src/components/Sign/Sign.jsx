import finance_theme_three from '../../assets/images/finance_theme_three.png'
import takeway_cup from '../../assets/Icons/takeway_cup.png'
import wave from '../../assets/images/wave.png'
import './Sign.scss'
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import dashboardDesktop from '../../assets/images/dashboard-desktop.png';
import galaxyDashboard from '../../assets/images/galaxy-dashboard.png';
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
            await axios.post(`${backendURL}/${email}`, { username, email });
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
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Enjoy Making Your <span className="budgeting">Budget</span>
                        </h1>
                        <p className="hero-description">
                            Personal budgeting is the secret to financial freedom.<br />
                            Start your journey today with Expensify.
                        </p>
                        <div className="feature-cards">
                            <div className="feature-card">
                                <img src={galaxyDashboard} alt="Mobile Dashboard" className="feature-img" />
                                <div>
                                    <h3>Track Anywhere</h3>
                                    <p>Log expenses on the go with our mobile-friendly dashboard.</p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <img src={dashboardDesktop} alt="Desktop Dashboard" className="feature-img" />
                                <div>
                                    <h3>Visual Insights</h3>
                                    <p>See your spending with beautiful, interactive charts.</p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <img src={reportDesktop} alt="Reports" className="feature-img" />
                                <div>
                                    <h3>Smart Reports</h3>
                                    <p>Get detailed reports to help you save and grow.</p>
                                </div>
                            </div>
                        </div>
                        <div className="extra-dashboard-mobile">
                            <img src={galaxyDashboard} alt="Mobile Dashboard Large" />
                        </div>
                    </div>
                    <div className="sign-form-card">
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