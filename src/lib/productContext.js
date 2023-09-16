import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch data from the API and set it to the state
    async function fetchData() {
      try {
        const response = await fetch("/api/airtable",{cache:'no-store'});
        const responseBody = await response.json()
        setApiData(responseBody.filterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [setApiData]);

  return (
    <ProductContext.Provider value={{ apiData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useApiDataContext = () => {
  return useContext(ProductContext);
};
