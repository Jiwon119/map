const { kakao } = window;

function DrawingFlagInfo(map) {
    
    // 출발 마커 Drawing Manager 옵션
    var startOptions = {
        map: map,
        drawingMode: [
            kakao.maps.drawing.OverlayType.MARKER
        ],
        // 사용자에게 제공할 그리기 가이드 툴팁
        guideTooltip: ['draw', 'drag', 'edit'], 

        // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정
        markerOptions: {
            draggable: true,
            removable: true,
            markerImages: [
                {
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
                    width: 50,
                    height: 45,
                    dragImage: {
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png',
                        width : 50, // 마커 크기
                        height : 64, // 마커 크기
                    }
                }

            ]
        }
    };

    // 도착 마커 Drawing Manager 옵션
    var endOptions = {
        map: map,
        drawingMode: [
            kakao.maps.drawing.OverlayType.MARKER
        ],
        // 사용자에게 제공할 그리기 가이드 툴팁
        markerOptions: {
            draggable: true,
            removable: true,
            markerImages: [
                {
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
                    width: 50,
                    height: 45,
                    dragImage: {
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png',
                        width : 50,
                        height : 64,
                    }
                }

            ]
        }
    };

    //Drawing Manager를 생성
    var startmanager = new kakao.maps.drawing.DrawingManager(startOptions);
    var endManager = new kakao.maps.drawing.DrawingManager(endOptions);

    
    return ({
        startmanager,
        endManager
        }
    )
}

export default DrawingFlagInfo