import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "./../../api/index";
import cx from 'classnames';

const CountryPicker = ({handleCountryChange}) => {
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const fetchCountryAPI = async () => {
      const fetchedCountries = await fetchCountries();
      setCountries(fetchedCountries);
    };
    fetchCountryAPI();
  }, [setCountries]);
  
  //countries?console.log(countries):console.log(null);

  return (
    <FormControl className={cx(styles.FormControl,styles.option)}>
      <NativeSelect defaultValue='' onChange={(e)=>{handleCountryChange(e.target.value)}} >
        <option value="" >Global</option>
  {countries.map((country,i)=><option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
