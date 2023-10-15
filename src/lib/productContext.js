import Loader from "@/components/spinner-loader/Loader";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [loading,setLoading]= useState(true);
  useEffect(() => {
    // Fetch data from the API and set it to the state
    async function fetchData() {
      try {
        const response = await fetch("/api/airtable");
        const responseBody = await response.json()
        setApiData(responseBody.filterData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [setApiData]);

  if (loading) {
    return <Loader />;
  }


  return (
    <ProductContext.Provider value={{ apiData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useApiDataContext = () => {
  return useContext(ProductContext);
};
