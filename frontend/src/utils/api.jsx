import { useEffect, useState } from 'react'
import axios from 'axios'


const useFetchData = () => {
    const [ username, setUsername ] = useState('')
    const [ sendErrMsg, setSendErrMsg ] = useState()
    const [ pin, setPin ] = useState([])

    const fetchUsernamesData = async () => {
        try {

            const res = await axios.get('http://localhost:5000/home/users/user')
            setPin(res.data.newName.pin)
            setUsername(res.data.newName.username)
        } catch (error) {
            console.error('Error found', error)
            if(error.message === 'Network Error'){
                setSendErrMsg('Server error, try reloading your page or check your internet connection')
            }
        }   
    }

    useEffect(() => {
        fetchUsernamesData();
    }, [])

    return [ username, sendErrMsg, pin ]
}
export default useFetchData
