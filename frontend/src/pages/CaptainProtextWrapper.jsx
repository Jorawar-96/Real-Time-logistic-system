import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/captainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainProtextWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain,setCaptain} = useContext(CaptainDataContext)
    const [isLoading,setIsLoading] = useState(true)



    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain);
            }
        })
        .catch(error => {
            setCaptain(null);
            navigate('/captain-login');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [token, navigate, setCaptain]);

        

    if(isLoading){
        return(
            <div>Loadingg...</div>
        )
    }

  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtextWrapper
