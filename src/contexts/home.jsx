import { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios'
import apiClient from "../services/apiClient"

const HomeContext = createContext(null)

// storing all the information for leagues, leagueName and seasons of each respective sport
const requestParams = {"basketball": {"league": 12, "season": "2021-2022", "leagueName": "NBA"},
                    "baseball": {"league": 1, "season": "2022", "leagueName": "MLB"},
                    "soccer": {"league": 253, "season": "2022", "leagueName": "Major League Soccer"},
                    "hockey": {"league": 57, "season": "2021", "leagueName": "NHL"},
                    "volleyball": {"league": 180, "season": "2022", "leagueName": "NVA"},
                    "rugby": {"league": 44, "season": "2022", "leagueName": "Major League Rugby"}}

export const HomeContextProvider = ({ children }) => {
    const [currentSport, setCurrentSport] = useState("baseball")
    const [league, setLeague] = useState("Major League Soccer")

    const [news, setNews] = useState([])
    const [teams, setTeams] = useState([])
    const [game, setGame] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingGame, setLoadingGame] = useState(true)
    const [loadingTeam, setLoadingTeam] = useState(true)
    const [loadingStats, setLoadingStats] = useState(true)
    const [loadingTeamGames, setLoadingTeamGames] = useState(true)
    const [team, setTeam] = useState(null)
    const [stats, setStats] = useState(null)
    const [teamGames, setTeamGames] = useState([])
    const [limit, setLimit] = useState(false)
    const [newsLimit, setNewsLimit] = useState(false)
    const [requestLimit, setRequestLimit] = useState(false)

    // fetches the news by sport
    async function getNews(){
        try{
          setLoading(true)
          const json = await apiClient.getNews(currentSport)
          setNews(json.data.json)
        } catch (error) {
          setError(error)
        }
        setLoading(false)
    }

    // fetches the teams by sport
    async function getTeams(){
        try{
            setLoading(true)
            setLeague(requestParams[currentSport].leagueName)
            const json = await apiClient.getTeams(currentSport)
            // error check
            if(json.error){
                setError(json.error)
                console.error(json.error)
            }
            // soccer data is formatted differently, change json formatting here to avoid complications
            if(currentSport == "soccer"){
                for(let i = 0; i < json.data.json.length; i++){
                    json.data.json[i] = json.data.json[i].team
                }
            }
            // delete the league from the list of baseball teams
            if(currentSport == "baseball"){
                delete json.data.json[0]
            }

            //delete the divisions from the list of hockey teams
            if(currentSport == "hockey"){
                delete json.data.json[2]
                delete json.data.json[7]
                delete json.data.json[24]
            }
            setTeams(json.data.json)
            
        } catch(error){
            setError(error)
        }
        setLoading(false)
    }

    // fetches the most recent game by sport and league
    async function getGame(){
        try{
            setLoadingGame(true)
            // conditionally fetches by the league and season of the specific sport
            const json = await apiClient.getRecentGame(currentSport)
            if(currentSport == "soccer"){
                json.data.json.scores = json.data.json.goals
                json.data.json.date = json.data.json.fixture.date
                json.data.json.status = json.data.json.fixture.status
            }
            else if(currentSport == "basketball" || currentSport == "baseball"){
                json.data.json.scores.home = json.data.json.scores.home.total
                json.data.json.scores.away = json.data.json.scores.away.total
            }
            setGame(json.data.json)
            // // soccer data is formatted differently, have to filter differently
            // if(currentSport === "soccer"){
            //     // filter to find the matches that finished/is in progress
            //     let filtered_games = json.data.json.filter((item)=>item.fixture.date < new Date().toISOString())

            //     // reformat the most recent game
            //     // change the key "goals" to "scores" to match the others
            //     filtered_games[filtered_games.length - 1].scores = filtered_games[filtered_games.length - 1].goals
            //     delete filtered_games[filtered_games.length - 1].goals

            //     // extract date and status variables to match others
            //     filtered_games[filtered_games.length - 1].date = filtered_games[filtered_games.length - 1].fixture.date
            //     filtered_games[filtered_games.length - 1].status = filtered_games[filtered_games.length - 1].fixture.status
            //     delete filtered_games[filtered_games.length - 1].fixture

            //     // set the updated game
            //     setGame(filtered_games[filtered_games.length - 1])
            // }

            // // data filtering for all the other sports
            // else{
            //     let filtered_games_others = json.data.json.filter((item)=>item.date < new Date().toISOString())
            //     if(currentSport == "basketball" || currentSport == "baseball"){
            //         // basketball and baseball are formatted differently, extract the total scores to match other formatting
            //         filtered_games_others[filtered_games_others.length - 1].scores.home = filtered_games_others[filtered_games_others.length - 1].scores.home.total
            //         filtered_games_others[filtered_games_others.length - 1].scores.away = filtered_games_others[filtered_games_others.length - 1].scores.away.total
            //     }
            //     setGame(filtered_games_others[filtered_games_others.length - 1])
            // }

            setLoadingGame(false)
            
            
        } catch(error){
            setError(error)
        }
       
       
    }

    // fetches detailed information for one team
    async function getTeam(sportName, teamId) {
        try{
            setLoadingTeam(true)
            // fetch team information using sportName and teamId
            setLeague(requestParams[sportName].leagueName)
            let json = await apiClient.getTeamDetail(sportName, teamId)
            if(json.data.limit){
                setLimit(true)
                return
              }
            // format soccer json data so it matches the others
            if(sportName === "soccer"){
                json.data.json[0] = json.data.json[0].team
            }
            setTeam(json.data.json[0])
        } catch(error){
            setError(error)
        }
        setLoadingTeam(false)
    }

    // fetches basic stats for a team
    async function getStats(sportName, teamId) {
    try {
            setLoadingStats(true)
            let json = await apiClient.getTeamStats(sportName, teamId)
            
            if(json.data.limit){
                setLimit(true)
                return
              }
            // soccer has a fixtures header unlike the others, change it to games
            if(sportName === "soccer"){ 
                json.data.json.games = json.data.json.fixtures
                // // soccer has total instead of all, format the json
                json.data.json.games.played.all = json.data.json.games.played.total
                json.data.json.games.wins.all = json.data.json.games.wins.total
                json.data.json.games.loses.all = json.data.json.games.loses.total
            }
            else{
                json.data.json.games.wins.all = json.data.json.games.wins.all.total
                json.data.json.games.loses.all = json.data.json.games.loses.all.total
            }
           
             setStats(json.data.json.games)
        } catch(error) {
            setError(error)
        }
        setLoadingStats(false)
    }

    // get the three most recent games for that team
    async function getTeamGames(sportName, teamId){
        try{
            setLoadingTeamGames(true)
            // conditionally fetches by the league and season of the specific sport
            let json = await apiClient.getTeamGames(sportName, teamId)
            if(json.data.limit){
                setLimit(true)
                return
              }
            // soccer data is formatted differently, have to filter differently
            if(sportName === "soccer"){
                // filter to find the matches that finished/is in progress
                let filtered_games = json.data.json.filter((item)=>item.fixture.date < new Date().toISOString())
                let selected_games = []

                // select the 3 most recent games
                if(filtered_games.length >= 3){
                    selected_games = [filtered_games[filtered_games.length - 1], filtered_games[filtered_games.length - 2], filtered_games[filtered_games.length - 3]]
                }
                else{
                    for(let i = 0; i < filtered_games.length; i++){
                        selected_games.push(filtered_games[i])
                    }
                }
                

                // reformat the most recent games
                for(let j = 0; j < selected_games.length; j++){
                    // change the key "goals" to "scores" to match the others
                    selected_games[j].scores = selected_games[j].goals
                    delete selected_games[j].goals

                    // extract date and status variables to match others
                    selected_games[j].date = selected_games[j].fixture.date
                    selected_games[j].status = selected_games[j].fixture.status
                    delete selected_games[j].fixture
                }
                // add necessary json keys, location and result
                determineStatus(selected_games, teamId)
                // set the recent games
                setTeamGames(selected_games)
            }
            // data filtering for all the other sports
            else{
                let filtered_games_others = json.data.json.filter((item)=>item.date < new Date().toISOString())
                let selected_games = []

                // select the 3 most recent games
                if(filtered_games_others.length >= 3){
                    selected_games = [filtered_games_others[filtered_games_others.length - 1], filtered_games_others[filtered_games_others.length - 2], filtered_games_others[filtered_games_others.length - 3]]
                }
                
                else{
                    for(let i = 0; i < filtered_games_others.length; i++){
                        selected_games.push(filtered_games_others[i])
                    }
                }
                if(sportName  == "basketball" || sportName == "baseball"){
                    // basketball and baseball are formatted differently, extract the total scores to match other formatting
                    for(let j = 0; j < selected_games.length; j++){
                        selected_games[j].scores.home = selected_games[j].scores.home.total
                        selected_games[j].scores.away = selected_games[j].scores.away.total
                    }
                    
                }
                determineStatus(selected_games, teamId)
                // set the recent games
                setTeamGames(selected_games)
            }

        } catch(error) {
            setError(error)
        }
        setLoadingTeamGames(false)
    }

    // helper function that determines if the current team is home or away, win or lose
    function determineStatus(arr, teamId){

        for(let i = 0; i < arr.length; i++){
            // determine if the current team is the home team
            if(arr[i].teams.home.id == teamId){
                arr[i].location = "HOME"
                // determine if the current team win, draw or lose
                if(arr[i].scores.home > arr[i].scores.away){
                    arr[i].WDL = "W"
                }
                else if(arr[i].scores.home == arr[i].scores.away){
                    arr[i].WDL = "D"
                }
                else{
                    arr[i].WDL = "L"
                }
            }
            else{
                arr[i].location = "AWAY"
                // determine if the current team win, draw or lose
                if(arr[i].scores.home > arr[i].scores.away){
                    arr[i].WDL = "L"
                }
                else if(arr[i].scores.home == arr[i].scores.away){
                    arr[i].WDL = "D"
                }
                else{
                    arr[i].WDL = "W"
                }
            }
        }
    }

    

    

    // renders different info as the currentSport changes
    useEffect(() => {
        getNews()
        getTeams()
        getGame()
    }, [currentSport])

    const homeValue = {currentSport, setCurrentSport, news, loading, getNews, teams, league, game, loadingGame, getTeam, team, loadingTeam, getStats, stats, error, setError, loadingStats, getTeamGames, teamGames, loadingTeamGames, limit, newsLimit, requestLimit}

    return(
        <HomeContext.Provider value = {homeValue}>
            <>{children}</>
        </HomeContext.Provider>
    )
}


export const useHomeContext = () => useContext(HomeContext)