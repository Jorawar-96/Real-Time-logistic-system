import { createContext,useState,useContext } from "react";
export const CaptainDataContext = createContext();

 const CaptainContext=({children})=>{
    const [captain,setCaptain] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const updateCaptain = (CaptainData)=>{
        setCaptain(CaptainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };
    return (
        <CaptainDataContext.Provider value={{ captain, isLoading, error,setCaptain, updateCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;