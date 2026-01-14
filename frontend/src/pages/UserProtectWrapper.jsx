import React,{use, useContext,useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user,setUser}=useContext(UserDataContext)
    const [isLoading,setIsLoading]=useState(true)


    useEffect(()=>{
      if(!token){
        navigate('/login')
    }
    },[token])


    useEffect(() => {
      if (!token) return;
      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            setUser(response.data.user);
          }
        })
        .catch(error => {
          // Optionally handle error, e.g., redirect to login
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [token, setUser]);

    if(isLoading){
      return(
        <div>Loading....</div>
      )
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectWrapper
