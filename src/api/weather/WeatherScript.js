import React from 'react'
import RegionInfo from './RegionInfo.json'

function WeatherScript() {
    // // 단기 예보
    // var xhr = new XMLHttpRequest();
    // var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    // var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'MoJTIPCYUWF3fpC%2BTirX00naE0GHr5iugQ3tJuEgpxr%2Fh%2FFcgGoBJqA4CcCHLYeGY%2BU%2Fdn09xNWQggn9ifLF9w%3D%3D'; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    // queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20221106'); /**/
    // queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('1200'); /**/
    // queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
    // queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
    
    // xhr.open('GET', url + queryParams);
    // xhr.onreadystatechange = function () {
    //     if (this.readyState === 4) {
    //                 const a = JSON.parse(this.responseText)['response'];
    //                 console.log(a)
    //             }
    // };

    // xhr.send('');

    const a = RegionInfo;
    let filter1 = a.filter(function(e){
      return e.first === "경기도" && e.second === '안양시만안구' && e.third === '석수2동';
  })
    //let filter3 = filter2.filter(it => it.third.includes('길음제1동'));

    console.log(filter1[0]['X'], " " , filter1[0]['Y']);

    // var now = new Date();
    // var year = now.getFullYear(); // 년도
    // var month = now.getMonth() + 1;  // 월
    // var date = now.getDate();  // 날짜
    // if(month < 10){
    //   month = '0' + month;
    // }
    // if(date < 10){
    //   date = '0' + date;
    // }
    // var dateFormat = year.toString() + month.toString() + date.toString();



    // //초단기 예보
    // var xhr = new XMLHttpRequest();
    // var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*URL*/
    // var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'MoJTIPCYUWF3fpC%2BTirX00naE0GHr5iugQ3tJuEgpxr%2Fh%2FFcgGoBJqA4CcCHLYeGY%2BU%2Fdn09xNWQggn9ifLF9w%3D%3D'
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /* 한 페이지 결과 수 */
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* 응답 자료 형식 */
    // queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(dateFormat); /**/
    // queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0630'); /**/
    // queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
    // queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
    // xhr.open('GET', url + queryParams);

    // xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         const a = JSON.parse(this.responseText)['response']['body']['items']['item'];
    //         console.log(a)
    //     }
    // };
    // xhr.send('');
    
    
  return (
    <div></div>
  )
}

export default WeatherScript