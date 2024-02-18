import React, { useContext, createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
export const VerifiedToolData = createContext();

export function VerifiedToolContextProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isVerifiedFilled, setIsVerifiedFilled] = useState(false);

  const handleVerifiedClick = () => {
    if (pathname !== "/") {
      router.push("/");
    }
    setIsVerifiedFilled(!isVerifiedFilled);
  };

  return (
    <>
      <VerifiedToolData.Provider
        value={{ isVerifiedFilled, handleVerifiedClick, setIsVerifiedFilled }}
      >
        {children}
      </VerifiedToolData.Provider>
    </>
  );
}

export const useVerifiedToolContextData = () => {
  return useContext(VerifiedToolData);
};
