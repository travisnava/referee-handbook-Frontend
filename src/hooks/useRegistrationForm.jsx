//react imports to hold register form state and useEffect to check if user is already signed in
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

//importing apiClient to communicate with backend for registering new users
import apiClient from '../services/apiClient'

//contexts to grab user data, to be used in useEffect for already signed in users
import { useAuthContext } from "../contexts/auth"



export const useRegistrationForm = () => {

  //grabbing currently signed in user data, if any
  const { user, setUser } = useAuthContext()



  //creating navigation to different pages for successful register, and form to submit to backend
  const navigate = useNavigate()
  const [userRegisterForm, setUserRegisterForm ] = useState({})
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(null)




  useEffect(() => {
    //if user is already logged in, then redirect to home page
    if(user?.username) {
      navigate("/learning")
    }
  }, [user, navigate])



  //register form handler
  function handleOnInputChange (evt) {
    setUserRegisterForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
  }



  const handleOnSubmitRegisterForm = async () => {
    setIsProcessing(true)

    if (userRegisterForm.password != userRegisterForm.confirmPassword){
      setError("Passwords don't match")
      setIsProcessing(false)
      return
    }

    else {
      const {data, error} = await apiClient.signupUser(userRegisterForm)
      if (error) {
        setError(error)
      }
      if(data?.user) {
        apiClient.setToken(data.token)
        setUser(data?.user)
        setUserRegisterForm(emptyRegisterForm)
        navigate("/learning")
      }
    }
    setIsProcessing(false)
  }



  return {
    userRegisterForm,
    error,
    handleOnInputChange,
    handleOnSubmitRegisterForm,
    isProcessing
  }
}