import React, { useEffect } from 'react'
import { useHomeContext } from '../../contexts/home'
import TeamGamesCard from '../TeamGamesCard/TeamGamesCard'
import "./TeamGamesGrid.css"

function TeamGamesGrid() {
  // uncomment this line below to use api instead of hardcoded data
  const {teamGames, loadingTeamGames} = useHomeContext()

  // hardcoded data just to test, ran out of API calls
//   let loadingTeamGames = false
//   let teamGames = [{"WDL": "W", "scores": {
//     "away": 1,
//     "home": 2
//   }, "teams":{
//     "away":{
//       "name": "Toronto Raptors",
//       "logo": "https://ftw.usatoday.com/wp-content/uploads/sites/90/2020/03/1280px-toronto_raptors_logo.svg_.png?w=996"
//     },
//     "home":{
//       "name": "team2",
//       "logo": "http://boards.sportslogos.net/uploads/monthly_2017_01/5885238954d28_KCPrimary.png.352aeea510a0c93f7eb4557026040c33.png"
//     }
//   }, "location": "HOME",
// "date": "11-11-2022",
// "status":{
//   "long": "finished"
// }}, {"WDL": "D", "scores": {
//   "away": 1,
//   "home": 1
// }, "teams":{
//   "away":{
//     "name": "Toronto Raptors",
//     "logo": "https://ftw.usatoday.com/wp-content/uploads/sites/90/2020/03/1280px-toronto_raptors_logo.svg_.png?w=996"
//   },
//   "home":{
//     "name": "Kentucky Colonels",
//     "logo": "http://boards.sportslogos.net/uploads/monthly_2017_01/5885238954d28_KCPrimary.png.352aeea510a0c93f7eb4557026040c33.png"
//   }
// }, "location": "AWAY",
// "date": "11-9-2022",
// "status":{
// "long": "finished"
// }},
// {"WDL": "L", "scores": {
//   "away": 2,
//   "home": 1
// }, "teams":{
//   "away":{
//     "name": "Toronto Raptors",
//     "logo": "https://ftw.usatoday.com/wp-content/uploads/sites/90/2020/03/1280px-toronto_raptors_logo.svg_.png?w=996"
//   },
//   "home":{
//     "name": "team2",
//     "logo": "http://boards.sportslogos.net/uploads/monthly_2017_01/5885238954d28_KCPrimary.png.352aeea510a0c93f7eb4557026040c33.png"
//   }
// }, "location": "HOME",
// "date": "11-7-2022",
// "status":{
// "long": "finished"
// }}]
  
  return (
    <><h2 className='recent-games-title'>Recent Games</h2>
    <div className='team-games-grid'>
      {loadingTeamGames ? <h3>Loading most recent games...</h3> :
      <>
        {teamGames.map((item)=> {return <TeamGamesCard id={item.date} team={item}/>})}
      </>}
    </div>
    </>
  )
}

export default TeamGamesGrid