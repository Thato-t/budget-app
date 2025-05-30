import { useEffect, useState } from 'react'
import axios from 'axios'


const useFetchData = () => {
    const [ username, setUsername ] = useState('')
    const [ sendErrMsg, setSendErrMsg ] = useState()

    const fetchUsernamesData = async () => {
        try {
            const regex = /\d+/g
            const res = await axios.get('http://localhost:5000')
            const resData = res.data.users
            const getItem = localStorage.getItem('username');
            for (let i = 0; i < resData.length; i++){
                if(resData[i].username === getItem){
                    const data = (resData[i].username).replace(regex, '').trim();
                    setUsername(data)
                }else if(!getItem){
                    setUsername((resData[i].username).replace(regex, '').trim())
                    console.log('Welcome new user')
                }
                else{
                    console.warn('try again')
                }
            }
            console.log(username)
        } catch (error) {
            console.error('Error found', error)
            if(error.message === 'Network Error'){
                setSendErrMsg('Network problem, try reloading your page or check your internet connection')
            }
        }   
    }

    useEffect(() => {
        fetchUsernamesData();
    }, [])

    return [ username, sendErrMsg ]
}
export default useFetchData
