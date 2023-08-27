import React, { useContext, createContext, useState, useEffect } from "react";

export const VerifiedToolData = createContext();

export function VerifiedToolContextProvider({ children }) {
    const [isVerifiedFilled, setIsVerifiedFilled] = useState(false);

    const handleVerifiedClick = () => {
      setIsVerifiedFilled(!isVerifiedFilled);
    };
  
  return (
    <>
      <VerifiedToolData.Provider value={{ isVerifiedFilled,handleVerifiedClick,setIsVerifiedFilled }}>
        {children}
      </VerifiedToolData.Provider>
    </>
  );
}

export const useVerifiedToolContextData = () => {
  return useContext(VerifiedToolData);
};
