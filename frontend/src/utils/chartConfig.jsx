import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement} from 'chart.js';
import axios from 'axios'
import useFetchData from './api.jsx'

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement );

function ChartConfig({ states }) {
    const [ amounts, setAmounts ] = useState([]);
    const [ display, setDisplay] = useState('none')
    const [ username ]  = useFetchData()

    const fetchData = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/home/dashboard` || `http://localhost:5000/reports/dashboard`)
            console.log(res)
            setAmounts(res.data.findLog.transactions)
        } catch(error){
            console.log('error found: ', error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const data = {
            labels: amounts.map(amount => amount.exampleName),
            datasets: [
                {                    
                    data: amounts.map(amount => amount.amountSpend),
                    backgroundColor: amounts.map(amount => amount.emojiBgdColor)
                }
            ]
        }
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            title: {display: false}
        }

  return (
    <>
        <Bar 
         data={data} 
         options={options}
         style={{ display: states === false ? display : 'flex'}}
        />
        <Pie 
         data={data}  
         style={{
            marginInline: 'auto',
            display: states === true ? display : 'flex'
         }}
        />
    </>
  )
}

export default ChartConfig