/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import './MapPage.css'

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
      };
    };
  }
}

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mapContainer.current) return

    // 카카오 SDK 로드 대기
    const checkKakaoSdk = () => {
      if (window.kakao && window.kakao.maps) {
        try {
          const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울시청 좌표
            level: 3
          }
          const kakaoMap = new window.kakao.maps.Map(mapContainer.current!, options)
          setMap(kakaoMap)
          setLoading(false)
        } catch (err) {
          console.error('지도 생성 실패:', err)
          setError('지도 생성 실패: ' + (err as Error).message)
          setLoading(false)
        }
      } else {
        // 아직 로드되지 않음, 100ms 후 재시도
        setTimeout(checkKakaoSdk, 100)
      }
    }

    checkKakaoSdk()
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('현재 위치를 가져올 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
  const moveLatLon = new window.kakao.maps.LatLng(lat, lng)
        
        if (map) {
          map.setCenter(moveLatLon)
          map.setLevel(3)
        }
      },
      (error) => {
        console.error('위치 정보를 가져오는데 실패했습니다:', error)
        alert('위치 정보를 가져오는데 실패했습니다.')
      }
    )
  }

  return (
    <div className="map-page">
      <div ref={mapContainer} className="map-container">
        {loading && !error && (
          <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',color:'#666'}}>지도를 불러오는 중...</div>
        )}
        {error && (
          <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',textAlign:'center',fontSize:'0.85rem',color:'#c00',background:'rgba(255,255,255,0.9)'}}>{error}</div>
        )}
      </div>
      {!loading && !error && (
        <button className="current-location-btn" onClick={getCurrentLocation}>
          <img src="/src/assets/icons/LocationMarkerOutline.svg" alt="현재 위치" />
        </button>
      )}
    </div>
  )
}

export default MapPage
