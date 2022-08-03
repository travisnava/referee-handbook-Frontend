

//react imports to hold login form state and useEffect to check if user is already signed in
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//contexts to grab user data, to be used in useEffect for already signed in users
import { useAuthContext } from "../contexts/auth"

//importing apiClient to communicate with backend for logging in users
import apiClient from '../services/apiClient'


export const useLoginForm = () => {

  const { user, setUser } = useAuthContext()



  //creating navigation to different pages for successful sign in, and form to submit to backend
  const navigate = useNavigate()
  const [userLoginForm, setUserLoginForm] = useState({})
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(null)


  useEffect(() => {
    //if user is already logged in, then redirect to home page
    if(user?.username) {
      navigate("/learning")
    }
  }, [user, navigate])





  //login form handler
  function handleOnInputChange (evt) {
    setUserLoginForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
  }



  const handleOnSubmitLogin = async () => {
    setError(null)
    setIsProcessing(true)
    const {data, error} = await apiClient.loginUser(userLoginForm)
    if (error) {
      setError(error)
      setIsProcessing(false)
      return
    }
    if(data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
      setIsProcessing(false)
      navigate("/learning")
    }
    setIsProcessing(false)
  }
  





  return {
    userLoginForm,
    error,
    handleOnInputChange,
    handleOnSubmitLogin,
    isProcessing
  }






}