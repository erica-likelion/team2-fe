/* Kakao 지도 SDK 동적 로더 */
/* eslint-disable @typescript-eslint/no-explicit-any */

const KAKAO_SDK_URL = '//dapi.kakao.com/v2/maps/sdk.js';

let loadingPromise: Promise<typeof window.kakao> | null = null;

export function loadKakaoMap(apiKey: string): Promise<typeof window.kakao> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window is undefined'));

  // 이미 로드됨
  if (window.kakao && window.kakao.maps) {
    return Promise.resolve(window.kakao);
  }

  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${KAKAO_SDK_URL}?appkey=${apiKey}`;
    script.async = true;
    script.onload = () => {
      // kakao.maps.load 타입 선언 미비로 any 단언
      const kakaoAny: any = window.kakao;
      if (kakaoAny && kakaoAny.maps && kakaoAny.maps.load) {
        kakaoAny.maps.load(() => resolve(kakaoAny));
      } else {
        reject(new Error('Kakao maps load function not available'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK'));
    document.head.appendChild(script);
  });

  return loadingPromise;
}
