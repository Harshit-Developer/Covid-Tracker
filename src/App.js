import React from "react";
import Cards from "./Components/Cards/Cards";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import Chart from "./Components/Chart/Chart";
import covidImage from "./images/Covid.png";
import styles from "./App.module.css";
import { fetchData } from "./api";


class App extends React.Component {
  state={
    data:{},
    country:'',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data:fetchedData
    })
  }

 handleCountryChange = async (country) =>{
   const fetchedData = await fetchData(country);
  // console.log(countryData);
   //console.log(country)
         this.setState({
           ...this.state,
           data:fetchedData,
           country:country
         })
    };

  
  render() {
    const {data,country} = this.state;
    return (
      <div className={styles.container}>
        <img src={covidImage} alt="corona-virus" className={styles.image} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;
