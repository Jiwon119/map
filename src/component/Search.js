import React from 'react'
import "./Search.css"

function Search() {
  return (
    <div id="menu_wrap">
        <div className="option">
            <div>
                키워드
                <input type="text" id="keyword" size="15"/> 
                <button id="keyWordSearchBtn">검색</button> 
            </div>
        </div>
        <br/>
        <hr/>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div>
  )
}

export default Search