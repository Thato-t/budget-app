import React, { useState, useEffect } from 'react'

function useLocalStorage() {

    const [ localStrEmail, setLocalStrEmail ] = useState('');

    useEffect(() => {
        try {
            const storedVal = localStorage.getItem('email');
            if (storedVal){
                const parsedUser = JSON.parse(storedVal);
                setLocalStrEmail(parsedUser);
                console.log(localStrEmail)
            }
        } catch (error) {
            console.error('Error found', error);
            setLocalStrEmail('');
        }
    }, [])

    useEffect(() => {
        if(!localStrEmail) return;
    }, [localStrEmail])

  return localStrEmail
}

export default useLocalStorage