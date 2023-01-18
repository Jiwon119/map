import React from 'react'
import RegionInfo from './RegionInfo.json'

function RegionFilter() {
    const a = RegionInfo;
    let filter1 = a.filter(function(e){
      return e.first === "경기도" && e.second === '고양시일산동구' && e.third === 'null';
    })

    console.log(filter1[0]['X'], " " , filter1[0]['Y']);



  return (
    <div>RegionFilter</div>
  )
}

export default RegionFilter