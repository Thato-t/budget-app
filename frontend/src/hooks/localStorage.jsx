import React, { useState, useEffect } from 'react'

function useLocalStorage() {

    const [ localStrEmail, setLocalStrEmail ] = useState(null);

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
            setLocalStrEmail(null);
        }
    }, [])

  return localStrEmail
}

export default useLocalStorage