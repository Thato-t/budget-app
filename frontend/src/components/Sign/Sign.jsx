import finance_theme_three from '../../assets/images/finance_theme_three.png'
import wave from '../../assets/images/wave.png'
import Dashboard from '../Dashboard/dashboard.jsx'
import './Sign.scss'
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Sign(){

    const [ username, setUsername ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [ data, setData ] = useState('');
    const [ getItem, setGetItem ] = useState('')
    const navigate = useNavigate();

    const onChange = (event) => {
        setUsername(event.target.value);
    }

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000');
            setData(res.data.users);
        } catch (error) {
            console.error('Error found', error)
        }

    }

    useEffect(() => {
        fetchData();
        setGetItem(localStorage.getItem('username'));
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(username.trim() === ''){
            setErrMsg('The username is required')
            return
        }
        for (let i = 0; i < data.length; i++){
            const regex = /^[a-z]+\d+$/gi
            console.log(data[i].username)
            if(data[i].username === username && username !== getItem){
                console.warn('username taken')
                return setErrMsg(`${username} is already taken try another`)
            }else{
                if(!username.match(regex)){
                    return setErrMsg(`Include random numbers like ${username}234. You mustn't forget those numbers`)
                }else if(data[i].username === username && username === getItem){
                    setErrMsg('Loading.....')
                    navigate('/home')
                    return
                }
                setErrMsg('Loading.....')
            }
        }
        try{

            const res = await axios.post('http://localhost:5000/', { username })
            console.log('User Saved')
            localStorage.setItem('username', username);
        }catch(error){
            console.error(error)
        }

        navigate('/home')
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
                                 placeholder="What is your username?"
                                 value={username}
                                 onChange={() => onChange(event)}
                                /><br></br>
                            </div>
                            <p className="sign-error">{errMsg}</p> 
                            {/* Must put an icon of a head or person inside the btn */}
                                <button type="submit" id="btn" className="btn"
                                >Get Started</button>
                        </div>
                    </form>
                </div>
                <img src={wave} alt="wave" className="wave" />
            </div>
        </>
    )
}
export default Sign