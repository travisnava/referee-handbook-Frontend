import moment from 'moment'
import React, { useEffect, useState } from 'react'
import "./TeamGamesCard.css"

function TeamGamesCard(props) {
  const [isLive, setIsLive] = useState(false)

  // takes the WDL letter, returns the actual word
  function WDLHandler(letter){
    if(letter == "W"){
      return "WIN"
    }
    else if(letter == "L"){
      return "LOSE"
    }
    else{
      return "DRAW"
    }
  }

  // checks if the game is live
  function gameIsLive(){
    if(props.team.status.short !="FT" && props.team.status.short !="AOT" && props.team.status.short !="POST" && props.team.status.short !="CANC" && props.team.status.short !="SUSP"){
      return true
    }
    return false
  }

  useEffect(() => {
    setIsLive(gameIsLive)
  }, [])

  return (
    <div className='team-games-card'>
      {props.team ? <>{isLive ? <p className='WDL G'>LIVE</p> : <p className={`WDL ${props.team.WDL}`}>{props.team.WDL}</p>}
      <div className='teams-card-body'>
        <img className='opponent-logo' src={props.team.location == "HOME" ? props.team.teams.away.logo : props.team.teams.home.logo} alt="opponent-logo"></img>
        {props.team.status.short !="FT" ? 
        <div className='teams-card-content'>
        <div className='header-line'>
          <p className='teams-card-scores'>{props.team.scores.home} - {props.team.scores.away}&nbsp;</p>
          <p>LIVE</p>
          <p className='teams-card-location'>&nbsp;at {props.team.location}</p>
        </div>
        
          <p className='opponent-name'>vs {props.team.location == "HOME" ? props.team.teams.away.name : props.team.teams.home.name}</p>
          <p className='teams-card-date'>on {moment(props.team.date).format("MM-DD-YYYY")}</p>
          <p className='team-card-time'>{props.team.status.long}</p>
        </div> : 
      <div className='teams-card-content'>
      <div className='header-line'>
        <p className='teams-card-scores'>{props.team.scores.home} - {props.team.scores.away}&nbsp;</p>
        <p className={`teams-card-results result-${props.team.WDL}`}>{WDLHandler(props.team.WDL)}</p>
        <p className='teams-card-location'>&nbsp;at {props.team.location}</p>
      </div>
      
        <p className='opponent-name'>vs {props.team.location == "HOME" ? props.team.teams.away.name : props.team.teams.home.name}</p>
        <p className='teams-card-date'>on {moment(props.team.date).format("MM-DD-YYYY")}</p>
        <p className='team-card-time'>{props.team.status.long}</p>
      </div>}
      </div>
      </>: null}
      
      
      
    </div>
  )
}

export default TeamGamesCard