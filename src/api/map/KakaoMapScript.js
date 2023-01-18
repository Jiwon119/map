import React, { useEffect, useRef } from "react";
import FlagInfo from "./FlagInfo";
import DrawingFlagInfo from "./DrawingFlagInfo";

const { kakao } = window;

const KakaoMapScript = ({getStart, getEnd}) => {
    const mapContainer = useRef();
    

    useEffect(() => {
        var startMarker, arriveMarker;

        var mapOption = {
            center: new kakao.maps.LatLng(37.39279, 126.97344), // 지도의 중심좌표
            level: 4, // 지도의 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
        }; 
        // 지도를 생성한다 
        var map = new kakao.maps.Map(mapContainer.current, mapOption); 
        


        //#region 출발, 도착 선택
        var startMarkerBtn = document.getElementById('startMarkerBtn');
        startMarkerBtn.onclick = () => startMarkerClick();
        var endMarkerBtn = document.getElementById('endMarkerBtn');
        endMarkerBtn.onclick = () => endMarkerClick();

        var startMarkerExist, endMarkerExist = false;

        var startmanager = DrawingFlagInfo(map).startmanager;
        var endManager = DrawingFlagInfo(map).endManager;


        // 버튼 클릭 시 호출되는 핸들러
        function startMarkerClick() {
            if(!startMarkerExist){
                startMarkerExist = true;
                // 클릭한 그리기 요소 타입을 선택
                startmanager.select(kakao.maps.drawing.OverlayType['MARKER']);
            }else{
            }
        }

        // 버튼 클릭 시 호출되는 핸들러
        function endMarkerClick() {
            if(!endMarkerExist){
                endMarkerExist = true;
                // 클릭한 그리기 요소 타입을 선택
                endManager.select(kakao.maps.drawing.OverlayType['MARKER']);
            }else{
                getEnd([])
            }
        }

        startmanager.addListener('state_changed', function() {
            var data = startmanager.getData()
            if(data['marker'][0]){
                getStart([data['marker'][0].y, data['marker'][0].x])
            }else{
                getStart([])
            }
            
        });
        
        endManager.addListener('state_changed', function() {
            var data = endManager.getData()
            if(data['marker'][0]){
                getEnd([data['marker'][0].y, data['marker'][0].x])
            }else{
                getEnd([])
            }
        });

        startmanager.addListener('remove', function() {
            startMarkerExist = false;
            getStart([])
        });

        endManager.addListener('remove', function() {
            endMarkerExist = false;
            getEnd([])
        });

        //#endregion



        //#region 키워드 검색
        var keyWordSearchBtn = document.getElementById('keyWordSearchBtn')
        var startSearchBtn = document.getElementById('startSearchBtn')
        var endSearchBtn = document.getElementById('endSearchBtn')

        
        keyWordSearchBtn.onclick = () => searchPlaces("keyword");
        startSearchBtn.onclick = () => searchPlaces("startInput");
        endSearchBtn.onclick = () => searchPlaces("endInput");

        // 마커를 담을 배열입니다
        var markers = [];

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();  

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true});
        var infowindowMouseOver = new kakao.maps.InfoWindow({zIndex:1});

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces(type) {
            var searchType;
            if(type === "keyword"){
                searchType = document.getElementById('keyword').value;
            }else if(type === "startInput"){
                searchType = document.getElementById('startInput').value;
            }else if(type === "endInput"){
                searchType = document.getElementById('endInput').value;
            }

            if (!searchType.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요.');
                return false;
            }

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch( searchType, placesSearchCB); 
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {

            var listEl = document.getElementById('placesList'), 
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(), 
            bounds = new kakao.maps.LatLngBounds();
            
            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
            
            for ( var i=0; i<places.length; i++ ) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i), 
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                (function(marker, title, placePosition) {
                    kakao.maps.event.addListener(marker, 'click', function() {
                        displayInfowindow(marker, title, placePosition);
                    });

                    itemEl.onmouseover =  function () {
                        displayInfowindowMouseOver(marker, title);
                    };

                    itemEl.onmouseout =  function () {
                        infowindowMouseOver.close();
                    };
                })(marker, places[i].place_name, placePosition);

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {

            var el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' +  places.address_name  + '</span>';
            } else {
                itemStr += '    <span>' +  places.address_name  + '</span>'; 
            }
                        
            itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                        '</div>';           

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage 
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i; 

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild (paginationEl.lastChild);
            }

            for (i=1; i<=pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i===pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title, placePosition) {

            var div = document.createElement('div');
            div.style = "padding:10px 25px 10px 10px; z-index:1;"

            var titleDiv = document.createElement('div');
            titleDiv.innerHTML = title;

            var startBtn = document.createElement('button');
            startBtn.innerHTML = '출발';

            startBtn.onclick = function() {
                if(!startMarkerExist){
                    startMarkerExist = true;
                    var startDragImage = FlagInfo().startDragImage;
                    var startImage = FlagInfo().startImage;
                    // 출발 마커를 생성합니다
                    startMarker = new kakao.maps.Marker({
                        map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
                        position:  new kakao.maps.LatLng(placePosition.Ma, placePosition.La),
                        draggable: true, // 출발 마커가 드래그 가능하도록 설정합니다
                        image: startImage // 출발 마커이미지를 설정합니다
                    });
                    getStart([placePosition.Ma, placePosition.La])
                    // 출발 마커에 dragstart 이벤트를 등록합니다
                    kakao.maps.event.addListener(startMarker, 'dragstart', function() {
                        // 출발 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
                        startMarker.setImage(startDragImage);
                    });
        
                    // 출발 마커에 dragend 이벤트를 등록합니다
                    kakao.maps.event.addListener(startMarker, 'dragend', function() {
                        // 출발 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
                        startMarker.setImage(startImage);
                        getStart([startMarker.getPosition().Ma, startMarker.getPosition().La]);
                    });
                }

            }
            var endBtn = document.createElement('button');
            endBtn.innerHTML = '도착';

            endBtn.onclick = function() {
                if(!endMarkerExist){
                    endMarkerExist = true;

                    var arriveImage = FlagInfo().arriveImage;
                    var arriveDragImage = FlagInfo().arriveDragImage;

                    // 도착 마커를 생성합니다 
                    arriveMarker = new kakao.maps.Marker({  
                        map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
                        position: new kakao.maps.LatLng(placePosition.Ma, placePosition.La),
                        draggable: true, // 도착 마커가 드래그 가능하도록 설정합니다
                        image: arriveImage // 도착 마커이미지를 설정합니다
                    });
                    getEnd([placePosition.Ma, placePosition.La])

                    // 도착 마커에 dragstart 이벤트를 등록합니다
                    kakao.maps.event.addListener(arriveMarker, 'dragstart', function() {
                        // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
                        arriveMarker.setImage(arriveDragImage);
                    });

                    // 도착 마커에 dragend 이벤트를 등록합니다
                    kakao.maps.event.addListener(arriveMarker, 'dragend', function() {
                        // 도착 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
                        arriveMarker.setImage(arriveImage); 
                        getEnd([arriveMarker.getPosition().Ma, arriveMarker.getPosition().La])
                    });
                }                
            }

            div.appendChild(titleDiv);
            div.appendChild(startBtn);
            div.appendChild(endBtn);

            infowindow.setContent(div);
            infowindow.open(map, marker);
        }

        function displayInfowindowMouseOver(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        
            infowindowMouseOver.setContent(content);
            infowindowMouseOver.open(map, marker);
        }
        
        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {   
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }

        //#endregion

        // 마커 다 지우기 이벤트
        var removeMarkerBtn = document.getElementById('removeMarkerBtn')
        removeMarkerBtn.onclick = () =>{
            if(startMarkerExist){
                var startOverlays = startmanager.getOverlays().marker;
                if(startOverlays.length !== 0){
                    startmanager.remove(startOverlays[0]);
                }else{
                    startMarker.setMap(null);
                }
                startMarkerExist = false;
                getStart([]);

            }
            if(endMarkerExist){
                var endOverlays = endManager.getOverlays().marker;
                if(endOverlays.length !== 0){
                    endManager.remove(endOverlays[0]);
                }else{
                    arriveMarker.setMap(null);
                }
                endMarkerExist = false;
                getEnd([]);
            }
        }
    
    }, [])
    

    return(
        <div 
            ref={mapContainer} 
            style={{ width: '100%', height: '100%' }}>
        </div>
    )
}

export default KakaoMapScript;