// Open-Meteo 날씨 조회 (API 키 불필요) - https://open-meteo.com/

export interface HourlyForecast {
  time: string; // "15시"
  temperature: number;
  emoji: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number; // m/s
  condition: string;
  emoji: string;
  high: number;
  low: number;
  hourly: HourlyForecast[];
  observedAt: string; // "2026-11-24T16:00" (현지 시각)
}

// 기본 위치: 서울
const DEFAULT_LOCATION = { name: '서울', latitude: 37.5665, longitude: 126.978 };

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: { time: string[]; temperature_2m: number[]; weather_code: number[] };
  daily: { temperature_2m_max: number[]; temperature_2m_min: number[] };
}

export async function getWeather(location = DEFAULT_LOCATION): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    hourly: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Seoul',
    forecast_days: '2',
    wind_speed_unit: 'ms',
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`날씨 조회 실패: ${res.status}`);
  const data = (await res.json()) as OpenMeteoResponse;
  const { current, hourly, daily } = data;

  // 현재 시각 이후 6시간 예보
  const currentHour = current.time.slice(0, 13);
  const start = Math.max(0, hourly.time.findIndex((t) => t.slice(0, 13) >= currentHour));
  const nextHours = hourly.time.slice(start + 1, start + 7).map((time, i) => ({
    time: `${Number(time.slice(11, 13))}시`,
    temperature: Math.round(hourly.temperature_2m[start + 1 + i]),
    emoji: describeWeather(hourly.weather_code[start + 1 + i]).emoji,
  }));

  const { label, emoji } = describeWeather(current.weather_code);
  return {
    location: location.name,
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
    condition: label,
    emoji,
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
    hourly: nextHours,
    observedAt: current.time,
  };
}

/** WMO 날씨 코드 → 한글 설명/이모지 */
function describeWeather(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: '맑음', emoji: '☀️' };
  if (code === 1) return { label: '대체로 맑음', emoji: '🌤️' };
  if (code === 2) return { label: '구름 조금', emoji: '⛅' };
  if (code === 3) return { label: '흐림', emoji: '☁️' };
  if (code === 45 || code === 48) return { label: '안개', emoji: '🌫️' };
  if (code >= 51 && code <= 57) return { label: '이슬비', emoji: '🌦️' };
  if (code >= 61 && code <= 67) return { label: '비', emoji: '🌧️' };
  if (code >= 71 && code <= 77) return { label: '눈', emoji: '🌨️' };
  if (code >= 80 && code <= 82) return { label: '소나기', emoji: '🌧️' };
  if (code === 85 || code === 86) return { label: '눈보라', emoji: '❄️' };
  if (code >= 95) return { label: '뇌우', emoji: '⛈️' };
  return { label: '알 수 없음', emoji: '🌡️' };
}
