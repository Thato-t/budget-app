import finance_theme_three from '../../assets/images/finance_theme_three.png'
import wave from '../../assets/images/wave.png'
import Dashboard from '../Dashboard/dashboard.jsx'
import './Sign.scss'
import { useEffect, useState } from 'react' 
import useLocalStorageName from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Sign(){

    const [ setItems ] = useLocalStorageName('name');
    const [ name, setName ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const navigate = useNavigate();

    const onChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(name.trim() === ''){
            setErrMsg('The name is required')
            return
        }
        try{
            const res = await axios.post('http://localhost:5000', { name })
            alert(`User saved: ${res.data.user.name}`)
            setName('')
        }catch(error){
            console.error(err)
            alert('Failed to save')
        }

        navigate('/')
        setItems(name)
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
                    <form onSubmit={handleSubmit}> 
                        <div className="right-mini-wrapper">
                            <div className="input-wrapper">
                                <input 
                                 type="text" 
                                 id="input" 
                                 className="input" 
                                 placeholder="What is your name?"
                                 value={name}
                                 onChange={() => onChange(event)}
                                /><br></br>
                            </div>
                            <p className="sign-error">{errMsg}</p> 
                            {/* Must put an icon of a head or person inside the btn */}
                                <button type="submit" id="btn" className="btn"
                                >Create Account</button>
                        </div>
                    </form>
                </div>
                <img src={wave} alt="wave" className="wave" />
            </div>
        </>
    )
}
export default Sign