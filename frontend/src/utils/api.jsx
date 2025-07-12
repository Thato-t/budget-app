import { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/localStorage.jsx'
const backendURL = import.meta.env.VITE_BACKEND_URI;


const useFetchData = () => {
    const [ username, setUsername ] = useState('')
    const [ sendErrMsg, setSendErrMsg ] = useState()
    const [ email, setEmail ] = useState('')
    const localStrEmail = useLocalStorage()

    const fetchUsernamesData = async () => {
        try {
            const res = await axios.get(`${backendURL}/emails/${localStrEmail}`)
            console.log(localStrEmail)
            const data = res.data.user
            setEmail(localStrEmail);
            setUsername(data.username);
        } catch (error) {
            console.error('Error found', error)
            if(error.message === 'Network Error'){
                setSendErrMsg('Server error, try reloading your page or check your internet connection')
            }
        }   
    }

    useEffect(() => {
        fetchUsernamesData();
    }, [localStrEmail])

    return [ username, sendErrMsg, email ]
}
export default useFetchData
