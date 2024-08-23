"use client"
import { createContext, useContext, useState } from "react";

// Create the context
const MyContext = createContext();

// Custom hook to use the context
export const useMyContext = () => useContext(MyContext);

// Context provider component
export const MyContextProvider = ({ children }) => {
   const [donationData, setDonationData] = useState({
      name: '',
      phoneNumber: '',
      bloodType: '',
      division: '',
      dhakaArea: ''
   });
   const [customState, setCustomState] = useState(null);

   return (
      <MyContext.Provider value={{ donationData, setDonationData, customState, setCustomState }}>
         {children}
      </MyContext.Provider>
   );
};
