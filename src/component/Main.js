import React, { useState } from 'react'
import KakaoMapScript from '../api/map/KakaoMapScript'
import Layout from '../layout/Layout';
import styles from './Main.module.css';
import Directions from './Directions';
import Search from './Search';
import WeatherScript from '../api/weather/WeatherScript';


function Main() {
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([])
  const getStart = (start) => {
    setStart(start);
  }
  const getEnd = (end) => {
    setEnd(end);
  }

  return (
    <Layout>
      <div className={styles.body}>
        <div className={styles.content}>
          <WeatherScript />
          <Directions 
            startAddress={start}
            endAddress={end}/>
            <br/>
          <div style={{height:"500px"}}>
            <Search />
          </div>
          
        </div> 
        <div className={styles.map}>
            <div id='kakaoMap'style={{ width: "100%", height:"100%"}}>
              <KakaoMapScript
                getStart={getStart}
                getEnd={getEnd} />
            </div>
        </div>  
      </div>

    </Layout>
    
    
  )
}

export default Main