const { kakao } = window;

function FlagInfo() {
    // 출발 마커
    var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소
        startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기
        startOption = { 
            offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정 (기본값은 이미지의 가운데 아래)
        };
    var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

    // 출발 드래그
    var startDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png', // 출발 마커의 드래그 이미지 주소
        startDragSize = new kakao.maps.Size(50, 64), // 출발 마커의 드래그 이미지 크기
        startDragOption = { 
            offset: new kakao.maps.Point(15, 54) // 출발 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정 (기본값은 이미지의 가운데 아래)
        };
    var startDragImage = new kakao.maps.MarkerImage(startDragSrc, startDragSize, startDragOption);

    // 도착 마커
    var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소
    arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기
    arriveOption = { 
        offset: new kakao.maps.Point(15, 43) // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정 (기본값은 이미지의 가운데 아래)
    };
    var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

    // 도착 드래그
    var arriveDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png', // 도착 마커의 드래그 이미지 주소
        arriveDragSize = new kakao.maps.Size(50, 64), // 도착 마커의 드래그 이미지 크기
        arriveDragOption = { 
            offset: new kakao.maps.Point(15, 54) // 도착 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정 (기본값은 이미지의 가운데 아래)
        };
    var arriveDragImage = new kakao.maps.MarkerImage(arriveDragSrc, arriveDragSize, arriveDragOption);


    return({
        startImage,
        startDragImage,
        arriveImage,
        arriveDragImage
        }
    )
}

export default FlagInfo