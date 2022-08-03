import React from 'react'
import { useHomeContext } from '../../contexts/home'
import {Link} from "react-router-dom"
import "./HomeRecentGames.css"
import moment from 'moment'

function HomeRecentGames() {

  const {league, game, loadingGame, currentSport, limit, requestLimit} = useHomeContext()

  return (
    // sets the classname as the current sport to conditionally render background
    <div className={`home-recent-games ${currentSport}`}>
        <div className='section-title'><h2 className='title-name'>Latest game in {league}</h2></div>
        {/* if is still loading, render a message */}
        {requestLimit ? <h3>At request limit for {currentSport}. Try navigating to a different sport!</h3> : null}
        {limit ? (<><h3>Uh oh! The Sports API is at its limit. Try refreshing or come back in a minute!</h3></>):((game == null || loadingGame) ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>) : (<div className='section-content'> 

        <p className='game-date'>{moment(game.date).format("MMM DD YYYY HH:mm")}</p>
        <div className='game-grid'>
          <div className='home-col game-col'>
          <Link to={`${currentSport}/${game.teams.home.id}`}><img src={game.teams.home.logo} className="games-team-logo"></img></Link>
            <p className='games-team-score'>{game.scores.home}</p>
          </div>
          <div className='away-col game-col'>
          <Link to={`${currentSport}/${game.teams.away.id}`}><img src={game.teams.away.logo} className="games-team-logo"></img></Link>
            <p className='games-team-score'>{game.scores.away}</p>
          </div>
        </div>
        <p className='game-status'>{game.status.short}</p>
        </div>))}

       
    </div>
  )
}

export default HomeRecentGames
