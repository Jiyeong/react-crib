/**
 * MineMine이 사용하는 외부 데이터 출처 목록 (설정 > 데이터 출처 페이지에 표시)
 * 새 위젯이나 API·MCP를 추가하면 이 목록도 함께 갱신한다.
 */
export interface DataSource {
  name: string;
  /** API / MCP / 내부 계산 등 */
  type: 'API' | 'RSS' | 'MCP' | '내부';
  description: string;
  /** 이 출처를 사용하는 위젯 */
  widgets: string[];
  url?: string;
  /** 라이선스·이용 조건 */
  note?: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    name: 'Open-Meteo',
    type: 'API',
    description: '현재 날씨와 시간별 예보 (서울 기준)',
    widgets: ['오늘의 날씨'],
    url: 'https://open-meteo.com/',
    note: 'CC BY 4.0, 비상업적 이용 무료',
  },
  {
    name: 'Frankfurter',
    type: 'API',
    description: '유럽중앙은행(ECB) 기준환율 기반 달러·엔화 원화 환율',
    widgets: ['오늘의 환율'],
    url: 'https://frankfurter.dev/',
    note: '영업일 기준 하루 1회 갱신',
  },
  {
    name: 'Google 뉴스 RSS',
    type: 'RSS',
    description: '한국어 기술(TECHNOLOGY)·비즈니스(BUSINESS) 토픽 헤드라인',
    widgets: ['IT 뉴스', '경제 뉴스'],
    url: 'https://news.google.com/',
    note: '기사 저작권은 각 언론사에 있음',
  },
  {
    name: '내부 날짜 계산',
    type: '내부',
    description: '외부 호출 없이 한국 시간(Asia/Seoul) 기준으로 계산',
    widgets: ['이번 달 달력'],
  },
];

/** 현재 사용 중인 MCP 서버 (없으면 빈 배열) */
export const MCP_SOURCES: DataSource[] = [];
