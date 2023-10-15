import Loader from "@/components/spinner-loader/Loader";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from 'swr'

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);


  const fetcher = async () => {
    const response = await fetch("/api/airtable");
    const responseBody = await response.json();
    return responseBody.filterData;
  };
  const {data,error} =   useSWR("/api/airtable",fetcher)

    useEffect(() => {
      if (data && !error) {
        setApiData(data);
      }
    }, [data, error]);
  
    if(error) {
      return 'An error has occured'
    }
    if(!data) {
      return (
        <Loader />
      )
    }




  // useEffect(() => {
  //   // Fetch data from the API and set it to the state
  //   async function fetchData() {
  //     try {
  //       const { signal } = new AbortController()
  //       const response = await fetch("/api/airtable",{signal});
  //       const responseBody = await response.json()
  //       setApiData(responseBody.filterData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [setApiData]);

  return (
    <ProductContext.Provider value={{ apiData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useApiDataContext = () => {
  return useContext(ProductContext);
};
