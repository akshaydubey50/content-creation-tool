import React, { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export const VerifiedToolData = createContext();

export function VerifiedToolContextProvider({ children }) {
  const router = useRouter();
    const [isVerifiedFilled, setIsVerifiedFilled] = useState(false);

    const handleVerifiedClick = () => {
      router.push('/');
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
