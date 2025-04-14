import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement} from 'chart.js';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement );

function ChartConfig({ states }) {
    const [ amounts, setAmounts ] = useState([]);
    const [ display, setDisplay] = useState('none')

    useEffect(() => {
        fetch('http://localhost:3002/0')
            .then(res => res.json())
            .then(dt => setAmounts([...dt.recent]))
            .catch(err => console.log(err))
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