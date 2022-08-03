import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";

import ApiClient from "../services/apiClient"

/* The line below will be implemented if we decide to utilize useContext for user auth */
// import { useAuthContext } from "./auth"

const LearningContext = createContext(null)


export const LearningContextProvider = ({children}) => {
    //state variables to be used/manipulated via useContext
    const [beginnerCourses, setBeginnerCourses] = useState([])
    const [currentlyEditing, setCurrentlyEditing] = useState({})  
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [expandedCourse, setExpandedCourse] = useState(null)
    
    //Uses api client to retrieve all beginner courses from the backend 
    const fetchCourses = async () => {
        setIsLoading(true)
        setError(null)
        const {data, error} = await ApiClient.fetchBeginnerCourses()
        if(data) {
            setBeginnerCourses(data.beginnerCourses)
        }
        if (error) {
            setError(error)
        }

        setInitialized(true)
        setIsLoading(false)
    }

    //callback function fetches courses and updates our setBeginnerCourses state variable
    useEffect(() => {

        fetchCourses()

    }, [setBeginnerCourses] )

    
    
    //value to be passed into the child component in the return statement
    const learningValue = { beginnerCourses, setBeginnerCourses, expandedCourse, setExpandedCourse, currentlyEditing, setCurrentlyEditing }
    
    //renders children propes previosly defined in LearningContextProvider using the values in learningValue
    return (
        <LearningContext.Provider value={learningValue}>
            <>{children}</>
        </LearningContext.Provider>
)

}

export const useLearningContext = () => useContext(LearningContext)


