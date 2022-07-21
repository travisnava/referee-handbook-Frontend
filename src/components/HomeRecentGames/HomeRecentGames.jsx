import React from 'react'
import { useHomeContext } from '../../contexts/home'
import "./HomeRecentGames.css"
import moment from 'moment'

function HomeRecentGames() {

  const {league, game, loadingGame, currentSport} = useHomeContext()

  console.log(loadingGame, game)
  return (
    // sets the classname as the current sport to conditionally render background
    <div className={`home-recent-games ${currentSport}`}>
        <div className='section-title'><h2 className='title-name'>Latest game in {league}</h2></div>
        {/* if is still loading, render a message */}
        {loadingGame ? (<h3>Loading game...</h3>) : (<div className='section-content'> 

        {/* soccer json is formatted as {fixture: } while others do not have that object, render separately */}
        {currentSport == "soccer" ? 
        <><p className='game-date'>{moment(game.fixture.date).format('MMM DD YYYY HH:mm Z')}</p>
        <div className='game-grid'>
          <div className='home-col game-col'>
            <img src={game.teams.home.logo} className="games-team-logo"></img>
            <p className='games-team-score'>{game.goals.home}</p>
          </div>
          <div className='away-col game-col'>
            <img src={game.teams.away.logo} className="games-team-logo"></img>
            <p className='games-team-score'>{game.goals.away}</p>
          </div>
        </div>
        <p className='game-status'>{game.fixture.status.short}</p></>
        : 
        // other sports are rendered here
        <><p className='game-date'>{moment(game.date).format("MMM DD YYYY HH:mm")}</p>
        <div className='game-grid'>
          <div className='home-col game-col'>
            <img src={game.teams.home.logo} className="games-team-logo"></img>

            {/* basketball and baseball have different formats for the scores */}
            {(currentSport == "basketball" || currentSport == "baseball") ? (<p className='games-team-score'>{game.scores.home.total}</p>) : (<p className='games-team-score'>{game.scores.home}</p>)}
          </div>
          <div className='away-col game-col'>
            <img src={game.teams.away.logo} className="games-team-logo"></img>
            {/* basketball and baseball have different formats for the scores */}
            {(currentSport == "basketball" || currentSport == "baseball") ? (<p className='games-team-score'>{game.scores.away.total}</p>) : (<p className='games-team-score'>{game.scores.away}</p>)}
          </div>
        </div>
        <p className='game-status'>{game.status.short}</p></>}
        </div>)}

       
    </div>
  )
}

export default HomeRecentGames
