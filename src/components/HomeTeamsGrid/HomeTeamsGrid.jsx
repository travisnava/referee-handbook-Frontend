import React from 'react'
import { useHomeContext } from '../../contexts/home'
import HomeTeamsCard from '../HomeTeamsCard/HomeTeamsCard'
import "./HomeTeamsGrid.css"

function HomeTeamsGrid() {

  const {league, teams, loading, currentSport, limit} = useHomeContext()

  return (
    <div className='home-teams-grid'>
        <div className='section-title'><h2 className='title-name'>{league}</h2></div>

        {/* if teams are still loading, render loading */}
        {loading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>) : (

        // for each team, render a team card
        <div className='grid-teams'>
            {teams.map((item) => {return <HomeTeamsCard teamId={item.id} name={item.name} logo={item.logo} id={item.id}/>})}
        </div>)}
    </div>
  )
}

export default HomeTeamsGrid