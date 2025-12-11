import type { Scenario } from '../types';

const PLACES = [
    '카페', '엘리베이터', '회사 탕비실', '버스 정류장', '지하철 옆자리',
    '편의점', '헬스장', '공원 벤치', '결혼식장', '도서관'
];

const PARTNERS = [
    '처음 보는 또래', '직장 상사', '옆집 이웃', '오랜만에 만난 동창',
    '택배 기사님', '헬스장 트레이너', '카페 알바생', '면접관', '소개팅 상대', '외국인 관광객'
];

const SITUATIONS = [
    '우연히 눈이 마주침', '날씨가 갑자기 비가 옴', '상대방이 무언가를 떨어뜨림',
    '같은 책을 읽고 있음', '줄을 서서 기다리는 중', '엘리베이터가 고장 남',
    '옷에 커피를 쏟음', '길을 물어봄', '반려견이 다가옴', '휴대폰 배터리가 없어서 빌림'
];

export const generateScenario = (): Scenario => {
    const place = PLACES[Math.floor(Math.random() * PLACES.length)];
    const partner = PARTNERS[Math.floor(Math.random() * PARTNERS.length)];
    const situation = SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)];

    return { place, partner, situation };
};
