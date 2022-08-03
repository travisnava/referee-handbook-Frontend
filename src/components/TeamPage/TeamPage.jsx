import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useHomeContext } from '../../contexts/home'
import "./TeamPage.css"

//MUI imports to save time on components, i.e button for user's to follow teams
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// apiClient import to be able to post new user following entry
import apiClient from '../../services/apiClient';
import TeamGamesGrid from '../TeamGamesGrid/TeamGamesGrid';
import { ArrowBack } from '@mui/icons-material';

//importing auth context to check if user is signed in
import { useAuthContext } from "../../contexts/auth"

function TeamPage() {

  // uncomment this line to use api
  const {league, team, loadingTeam, getTeam, loadingStats, getStats, stats, error, setError, getTeamGames, limit} = useHomeContext()

  // temporary hardcode data for testing
//   const loadingTeam = false;
//   const limit = false;
//   const team = {"name": "Golden State Warriors", "logo": "https://logos-download.com/wp-content/uploads/2016/04/Golden_State_Warriors_logo_logotype.png"}
//   let league = "NBA"
//   const stats = {"played": {
//     "home": 1,
//     "away": 1,
//     "all": 2
//   },
// "wins":{
//   "all":{
//     "total": 2
//   }
// },
// "loses":{
//   "all":{
//     "total": 0
//   }
// }}
  const {sportName, teamId} = useParams()
  const [followSuccess, setFollowSuccess] = useState(false)
  const [unfollowSuccess, setUnfollowSuccess] = useState(false)
  // const [error, setError] = useState()
  const [followedTeam, setFollowedTeam] = useState([])
  const [currentlyFollowing, setCurrentlyFollowing] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()




  useEffect(() => {
    getTeam(sportName, teamId)
    getStats(sportName, teamId)
    getTeamGames(sportName, teamId)
  }, [])











  //create onsubmit handler to call apiClient and post new user following entry
  const handleOnFollow = async () => {
    setFollowSuccess(false)
    if(!user?.username){
      navigate("/login")
    } 

    if (!loadingTeam) {
      let followTeam = {teamName: team?.name, teamLogo: team?.logo, teamLeague: league}
      const {data, error} = await apiClient.followTeam(followTeam, sportName, teamId)
      if (error) {
        setError(error)
      }
      if(data){
          setFollowSuccess(true)
          setCurrentlyFollowing(true)
      }
    }
  }



    //create onsubmit handler to call apiClient and delete current user following entry
    const handleOnUnfollow = async () => {
      setUnfollowSuccess(false)
      if (!loadingTeam) {
        const {data, error} = await apiClient.unfollowTeam(sportName, teamId)
        if (error) {
          setError(error)
        }
        if(data){
          setUnfollowSuccess(true)
          setCurrentlyFollowing(false)
        }
      }
    }






  //fetching if user is logged in & currently following the currently selected team
  useEffect(() => {
    const fetchUserOwnedObjects = async () => {
      // checking if user is logged in, if so then check if currently following team
      if(user?.username){
        setCurrentlyFollowing(false)
        const {data, error} = await apiClient.listFollowedTeamByUser(sportName, teamId)
        if(data){
          // user is following team, display unfollow button
          setFollowedTeam(data.followedTeam)
          setCurrentlyFollowing(true)
        }
        // data is empty, so user isn't following the team, so display follow button
        if(Object.keys(data).length === 0) {
          setCurrentlyFollowing(false)
        }
        if(error){
          setError(error)
        }
      }


    }
    fetchUserOwnedObjects()
  }, [])



  const handleOnReturn = async() => {
    navigate("/sports")
  }




  return (
    <div className='team-page'>
      <div className='team-page-buttons'>
        <Button className="create-course-btn"  variant="contained" size="large"  endIcon={<ArrowBack/>} onClick={handleOnReturn} shrink="false" sx={{ color: 'black',  height:"6ch", fontSize:"16px", backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} >Return</Button>
        <Button className="create-course-btn"  variant="contained" size="large"  endIcon={<BookmarkIcon/>} onClick={currentlyFollowing ? handleOnUnfollow : handleOnFollow} shrink="false" sx={{ color: 'black',  height:"6ch", fontSize:"16px", backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} > {currentlyFollowing ? "UNFOLLOW" : "FOLLOW"} </Button>

        
      </div>
      {followSuccess && currentlyFollowing ? <p className="follow-success">Successfully followed!</p> : null}
      {unfollowSuccess && !currentlyFollowing ? <p className="unfollow-success">Successfully unfollowed!</p> : null}
      {limit ? (<h3>Uh oh! The sports API is at its limit. Try refreshing or come back in a minute.</h3>) : (
      <>
      {team == null ? <h3>Loading team...</h3> : <div className='team-page-header'>
      <img className='team-page-logo' src={team.logo}></img>
      <div className='team-page-title'><h1 className='team-page-name'>{team.name}</h1>
      <h2 className='team-page-league'>{league}</h2></div>
      
      </div>}
      {stats == null ? <h3>Loading stats...</h3> : <div className='team-page-stats'>
        <p>Home: {stats.played.home} •&nbsp;</p>  
        <p>Away: {stats.played.away} •&nbsp;</p>
        <p>Total: {stats.played.all} •&nbsp;</p>
        <p>{stats.wins.all.total}W {stats.loses.all.total}L </p>    
      </div>}
      <TeamGamesGrid />
      </>)}
      
    </div>
  )
}

export default TeamPage