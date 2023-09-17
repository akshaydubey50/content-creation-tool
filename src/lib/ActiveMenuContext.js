import React, { createContext, useContext, useState } from "react";

const ActiveMenuContext = createContext();

export function ActiveMenuContextProvider({ children }) {
    const [isActiveMenu, setIsActiveMenu] = useState(0);
    const handleNavbarMenu = (index) => {
        setIsActiveMenu(index);
      };
  return (
    <>
      <ActiveMenuContext.Provider value={{isActiveMenu,handleNavbarMenu}}>
        {children}
      </ActiveMenuContext.Provider>
    </>
  );
}


export const useActiveMenuContextData = () => {
    return useContext(ActiveMenuContext);
  };