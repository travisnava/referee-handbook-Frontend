import React, { useEffect, useState } from 'react'
import "./HomeNews.css"


import HomeNewsCard from '../HomeNewsCard/HomeNewsCard'
import { useHomeContext } from '../../contexts/home'


function HomeNews() {
  const {news, loading, currentSport, newsLimit} = useHomeContext()

  return (
    <div className='home-news'>
        {/* conditionally render title based on current sport */}
        <div className='section-title'><h2 className='title-name'>Latest news in {currentSport}</h2></div>
        {/* if out of api calls, render message */}
        {/* if news is still loading, render loading */}
        {newsLimit ? <h3>Uh oh! The News API is at its limit. Check out our other pages!</h3> : ((loading || news == null) ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>) : (

        // for each news article, render a news card
        <div className='news-cards'>       
          {news.map((item) => {
            return (<HomeNewsCard imageUrl={item.image_url} title={item.title} url={item.url} time={item.published_at}/>)
          })}
        </div>))}
    </div>
  )
} 

export default HomeNews