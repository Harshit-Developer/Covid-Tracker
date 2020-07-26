import React,{useEffect,useState} from 'react';
import {fetchDailyData} from "../../api";
import {Bar,Line} from 'react-chartjs-2';
import styles from "./Chart.module.css";


const Chart = ({data:{confirmed,recoverd,deaths},country}) => {
    const [dailyData,setDailyData]=useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            const fetchedData = await fetchDailyData();
            setDailyData(fetchedData);
        }
        fetchAPI();
    },[]);


    const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => date),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
              ],
            }}
          />
        ) : null
      );

//console.log(data.confirmed,data.deaths,data.recovered);

const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recoverd.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );
    return ( 
       <div className={styles.container}>
           
          {country?barChart:lineChart}
       </div>
       
       
     );
}
 
export default Chart;