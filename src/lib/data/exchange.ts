// Frankfurter 환율 조회 (유럽중앙은행 기준환율, API 키 불필요) - https://frankfurter.dev/

export interface RateInfo {
  rate: number; // 원화 기준 환율
  change: number; // 전일 대비 변동 (원)
  changePercent: number;
}

export interface ExchangeData {
  usd: RateInfo; // 1달러 = n원
  jpy100: RateInfo; // 100엔 = n원
  date: string; // 기준일 "2026-11-23"
}

interface FrankfurterSeries {
  rates: Record<string, { KRW: number; JPY: number }>;
}

export async function getExchangeRates(): Promise<ExchangeData> {
  // 주말·공휴일에는 고시가 없으므로 최근 10일 구간을 조회해 마지막 2개 영업일을 비교한다.
  const start = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const res = await fetch(`https://api.frankfurter.app/${start}..?from=USD&to=KRW,JPY`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`환율 조회 실패: ${res.status}`);
  const { rates } = (await res.json()) as FrankfurterSeries;

  const dates = Object.keys(rates).sort();
  if (dates.length < 2) throw new Error('환율 데이터가 부족합니다.');
  const latest = rates[dates[dates.length - 1]];
  const previous = rates[dates[dates.length - 2]];

  const jpy100 = (r: { KRW: number; JPY: number }) => (r.KRW / r.JPY) * 100;
  return {
    usd: toRateInfo(latest.KRW, previous.KRW),
    jpy100: toRateInfo(jpy100(latest), jpy100(previous)),
    date: dates[dates.length - 1],
  };
}

function toRateInfo(current: number, previous: number): RateInfo {
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    rate: round(current),
    change: round(current - previous),
    changePercent: round(((current - previous) / previous) * 100),
  };
}
