import { useState } from "react"
import apiClient from "../services/apiClient"


export const usePasswordResetForm = (token) => {

    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({})



    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setError(null)
    


        if (form.confirmPassword !== form.password) {
          setError("Passwords don't match")
          setIsProcessing(false)
          return
        } 

        if (!form.password) {
          setError("No password provided")
          setIsProcessing(false)
          return
        }


        else {
            const { data, error } = await apiClient.resetPassword({ token, newPassword: form.password })
            if (error) setError(error)
            if (data?.message) setMessage(data.message)
        }
        setIsProcessing(false)
      }
    



      const handleOnInputChange = (evt) => {
        setForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
    }



    return {
        form,
        error,
        message,
        isProcessing,
        handleOnSubmit,
        handleOnInputChange
    }
} 