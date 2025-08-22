// 이미지 import
import store1 from '../assets/images/stores/1.webp';
import store2 from '../assets/images/stores/2.webp';
import store3 from '../assets/images/stores/3.webp';
import store4 from '../assets/images/stores/4.webp';
import store5 from '../assets/images/stores/5.webp';
import store6 from '../assets/images/stores/6.webp';
import store7 from '../assets/images/stores/7.webp';
import store8 from '../assets/images/stores/8.webp';
import store9 from '../assets/images/stores/9.webp';
import store10 from '../assets/images/stores/10.webp';

// 상점 데이터 타입 정의
export interface StoreData {
  id: number;
  name: string;
  description: string;
  hours: string;
  tags: string[];
  image: string;
  position: {
    lat: number;
    lng: number;
  };
  // 추가 필드들 (필요에 따라 확장 가능)
  address?: string;
  phone?: string;
  rating?: number;
  country?: string;
  openTime?: string;
  closeTime?: string;
}

// 데모 상점 데이터
export const demoStores: StoreData[] = [
  {
    id: 1,
    name: '아시아 마트',
    description: '안산시 상록구 사동',
    hours: '영업시간: 09:00 - 21:00',
    tags: ['다양한 국가', '아시아 식품', '영업중'],
    image: store1,
    position: { lat: 37.2975, lng: 126.8373 },
    address: '안산시 상록구 사동',
    country: 'Various',
    openTime: '09:00:00',
    closeTime: '21:00:00'
  },
  {
    id: 2,
    name: '월드 푸드',
    description: '안산시 상록구 사동',
    hours: '영업시간: 10:00 - 22:00',
    tags: ['다양한 국가', '세계 음식', '영업중'],
    image: store2,
    position: { lat: 37.2968, lng: 126.8385 },
    address: '안산시 상록구 사동',
    country: 'Various',
    openTime: '10:00:00',
    closeTime: '22:00:00'
  },
  {
    id: 3,
    name: '사마르칸트',
    description: '안산시 상록구 본오동',
    hours: '영업시간: 09:30 - 20:30',
    tags: ['우즈베키스탄', '중앙아시아', '전통음식'],
    image: store3,
    position: { lat: 37.2955, lng: 126.8369 },
    address: '안산시 상록구 본오동',
    country: 'Uzbekistan',
    openTime: '09:30:00',
    closeTime: '20:30:00'
  },
  {
    id: 4,
    name: '베트남 식료품',
    description: '안산시 상록구 사동',
    hours: '영업시간: 08:00 - 20:00',
    tags: ['베트남', '동남아시아', '신선재료'],
    image: store4,
    position: { lat: 37.3001, lng: 126.8402 },
    address: '안산시 상록구 사동',
    country: 'Vietnam',
    openTime: '08:00:00',
    closeTime: '20:00:00'
  },
  {
    id: 5,
    name: '할랄 미트 & 식료품',
    description: '안산시 상록구 본오동',
    hours: '영업시간: 11:00 - 23:00',
    tags: ['할랄', '이슬람', '고기전문'],
    image: store5,
    position: { lat: 37.2949, lng: 126.8355 },
    address: '안산시 상록구 본오동',
    country: 'Halal',
    openTime: '11:00:00',
    closeTime: '23:00:00'
  },
  {
    id: 6,
    name: '러시안 마켓',
    description: '안산시 상록구 사동',
    hours: '영업시간: 10:00 - 21:00',
    tags: ['러시아', '동유럽', '수입식품'],
    image: store6,
    position: { lat: 37.2982, lng: 126.8391 },
    address: '안산시 상록구 사동',
    country: 'Russia',
    openTime: '10:00:00',
    closeTime: '21:00:00'
  },
  {
    id: 7,
    name: '중국 식품점',
    description: '안산시 상록구 사동',
    hours: '영업시간: 09:00 - 22:00',
    tags: ['중국', '중화요리', '재료전문'],
    image: store7,
    position: { lat: 37.2995, lng: 126.8378 },
    address: '안산시 상록구 사동',
    country: 'China',
    openTime: '09:00:00',
    closeTime: '22:00:00'
  },
  {
    id: 8,
    name: '인도 향신료 가게',
    description: '안산시 상록구 본오동',
    hours: '영업시간: 10:30 - 20:00',
    tags: ['인도', '향신료', '커리재료'],
    image: store8,
    position: { lat: 37.2961, lng: 126.8349 },
    address: '안산시 상록구 본오동',
    country: 'India',
    openTime: '10:30:00',
    closeTime: '20:00:00'
  },
  {
    id: 9,
    name: '필리핀 스토어',
    description: '안산시 상록구 사동',
    hours: '영업시간: 09:00 - 21:00',
    tags: ['필리핀', '동남아시아', '열대과일'],
    image: store9,
    position: { lat: 37.2979, lng: 126.8415 },
    address: '안산시 상록구 사동',
    country: 'Philippines',
    openTime: '09:00:00',
    closeTime: '21:00:00'
  },
  {
    id: 10,
    name: '타코 재료점',
    description: '안산시 상록구 본오동',
    hours: '영업시간: 11:00 - 19:00',
    tags: ['멕시코', '타코', '라틴음식'],
    image: store10,
    position: { lat: 37.2953, lng: 126.8388 },
    address: '안산시 상록구 본오동',
    country: 'Mexico',
    openTime: '11:00:00',
    closeTime: '19:00:00'
  }
];

// 특정 ID로 상점 찾기
export const getStoreById = (id: number): StoreData | undefined => {
  return demoStores.find(store => store.id === id);
};

// 홈페이지용 인기 상점 (처음 6개)
export const getHotStores = (): StoreData[] => {
  return demoStores.slice(0, 6);
};

// 특정 국가별 상점 필터링
export const getStoresByCountry = (country: string): StoreData[] => {
  return demoStores.filter(store => store.country === country);
};

// 특정 지역별 상점 필터링
export const getStoresByAddress = (address: string): StoreData[] => {
  return demoStores.filter(store => store.address?.includes(address));
};
