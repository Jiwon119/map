import React from 'react'
import styles from './Directions.module.css';
import { IoFlagSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'

function Directions({startAddress, endAddress}) {
    var startCheck, endCheck = null;
    var url = `https://map.kakao.com/link/to/도착지,${endAddress}/from/출발지,${startAddress}`;
    
    if(endAddress.length !== 0){
        endCheck = "선택 완료"
    }else{
        endCheck = "";
    }

    if(startAddress.length !== 0){
        startCheck = "선택 완료"
    }else{
        startCheck = "";
    }

    return (
    <div className={styles.frame}>
        <div className={styles.titleGrop}>
            <h3>길찾기</h3>
            <button 
                id="removeMarkerBtn"
                className={styles.removeBtn}>
                <TbRefresh style={{ color: "gray"}} className={styles.icon}/>다시 선택
            </button>
        </div>

        <div className={styles.inputGroup}>
            <div className={styles.inputText}>출발</div>
            <input 
                id="startInput"
                className={styles.input} 
                type="text" 
                defaultValue={startCheck}
                placeholder='출발지 입력'/>
            <button 
                id="startSearchBtn"
                className={styles.searchBtn}>검색</button>
            <button 
                id='startMarkerBtn'
                className={styles.markerBtn}>
                    <IoFlagSharp style={{color: "#e18989"}} className={styles.icon}/>
            </button>
        </div>
        <div className={styles.inputGroup}>
            <div className={styles.inputText}>도착</div>
            <input 
                id="endInput"
                className={styles.input} 
                type="text" 
                defaultValue={endCheck}
                placeholder='도착지 입력' />
            <button 
                id="endSearchBtn"
                className={styles.searchBtn}>검색</button>
            <button 
                id='endMarkerBtn'
                className={styles.markerBtn}>
                    <IoFlagSharp style={{color: "#89a4e1"}} className={styles.icon}/>
            </button>
        </div>

        <a href={url}>길찾기 검색 &gt;</a>

    </div>
  )
}

export default Directions