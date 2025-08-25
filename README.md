<div align="center">
<img alt="grocering-logo" src="public/logo_nosub.png" width="200" />

### 당신의 동네에서 만나는 세계의 맛, 그로서링

#### 멋쟁이사자처럼 X 한양대 ERICA: TEAM AEAO

**📱 PWA(Progressive Web App) 기반 모바일 웹 애플리케이션**

</div>

## 주요 기능

- **PWA 기반 모바일 웹앱**: 모바일 앱과 같은 사용자 경험 제공
- **개인화된 온보딩**: 사용자의 식품 선호도, 알레르기 정보, 요리 스타일 등을 수집하여 맞춤형 서비스 제공
- **AI 레시피 추천**: 사용자 선호도 기반으로 개인화된 레시피 제안
- **지도 기반 매장 검색**: 카카오맵 API를 활용한 주변 식료품점 및 마트 검색
- **매장별 상품 정보**: 각 매장의 식재료 정보와 가격 비교
- **게스트 세션 관리**: 별도의 회원가입 없이 로컬스토리지와 백엔드 세션을 통한 사용자 데이터 관리

## 기술 스택

<div align="center">

### Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white) | 19.1.1 | 메인 프론트엔드 프레임워크 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | 5.8.3 | 타입 안전성 및 개발 생산성 향상 |
| ![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white) | 7.1.2 | 빠른 개발 서버 및 빌드 도구 |
| ![React Router](https://img.shields.io/badge/React_Router-7.8.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white) | 7.8.0 | 클라이언트 사이드 라우팅 |

### UI/UX & PWA
| 기술 | 설명 |
|------|------|
| ![CSS3](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white) | 컴포넌트 스타일링 |
| ![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white) | 네이티브 앱과 유사한 모바일 경험 |
| ![React Slick](https://img.shields.io/badge/React_Slick-61DAFB?style=for-the-badge&logo=react&logoColor=white) | 이미지 캐러셀 및 슬라이더 |

### 외부 API & 서비스
| 기술 | 설명 |
|------|------|
| ![KakaoMap](https://img.shields.io/badge/Kakao_Map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black) | 지도 서비스 및 위치 기반 검색 |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | 배포 및 호스팅 플랫폼 |

### 개발 도구
| 기술 | 설명 |
|------|------|
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) | 코드 품질 관리 |
| ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | JavaScript 런타임 환경 |

</div>

## 프로젝트 구조

```
team2-fe/
├── public/                     # 정적 파일
│   ├── icon-192.png           # PWA 아이콘
│   ├── manifest.json          # PWA 매니페스트
│   └── splash_screens/        # PWA 스플래시 스크린들
├── src/
│   ├── App.tsx               # 메인 애플리케이션 컴포넌트
│   ├── main.tsx              # 애플리케이션 엔트리 포인트
│   ├── assets/               # 정적 리소스 (이미지, 아이콘 등)
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── BottomSheet.tsx   # 바텀시트 컴포넌트
│   │   ├── Navbar.tsx        # 네비게이션 바
│   │   ├── SearchBar.tsx     # 검색 바
│   │   ├── SplashScreen.tsx  # 스플래시 스크린
│   │   └── Toast.tsx         # 토스트 알림
│   ├── pages/                # 페이지 컴포넌트들
│   │   ├── Landing/          # 랜딩 페이지
│   │   ├── Onboarding/       # 온보딩 페이지들
│   │   ├── Home/             # 홈 페이지
│   │   ├── Map/              # 지도 페이지
│   │   ├── Menu/             # 메뉴 페이지
│   │   ├── Recipe/           # 레시피 관련 페이지들
│   │   ├── Shop/             # 매장 상세 페이지
│   │   └── User/             # 사용자 설정 페이지
│   ├── services/             # API 및 비즈니스 로직
│   │   └── sessionManager.ts # 게스트 세션 관리
│   ├── constants/            # 상수 정의
│   └── types/                # TypeScript 타입 정의
├── package.json              # 프로젝트 의존성 및 스크립트
├── vite.config.ts           # Vite 설정
├── tsconfig.json            # TypeScript 설정
├── vercel.json              # Vercel 배포 설정
└── eslint.config.js         # ESLint 설정
```

## 설치 및 실행

### 환경 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 설정하세요:

```env
VITE_KAKAO_MAP_API_KEY=YOUR_KAKAO_MAP_API_KEY
VITE_API_BASE_URL=YOUR_BACKEND_API_URL
```

### 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트: 8080)
npm run dev
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 배포

이 프로젝트는 Vercel을 통해 배포되었습니다. 배포 설정은 `vercel.json` 파일에 정의되어 있습니다.

#### 실제 배포 URL
- [https://grocering-demo.vercel.app](https://grocering-demo.vercel.app)

## 게스트 세션 시스템

이 프로젝트는 시연을 목적으로 별도의 회원가입/로그인 없이 사용할 수 있도록 게스트 세션 시스템을 구현했습니다:

- **자동 세션 생성**: 첫 방문 시 자동으로 게스트 ID 생성
- **로컬 스토리지 활용**: 사용자 선호도 및 설정 정보를 브라우저에 저장
- **24시간 세션 유지**: 세션 만료 시 자동으로 새로운 세션 생성
- **백엔드 연동**: 서버 세션과 동기화하여 일관된 사용자 경험 제공

## 라이선스

이 프로젝트는 해커톤 참여를 위해 제작된 데모 애플리케이션입니다.
