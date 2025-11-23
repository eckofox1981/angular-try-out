const key: string = import.meta.env.NG_APP_OPEN_WX_KEY;

export const OPEN_WX_API_KEY: string = `&appid=${key}`; //includes syntax for call,

export function CITY_GEOCODING_URL(name: string) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=20`;
}

export function REVERSE_GEODING_URL(lat: number, lon: number) {
  const latitude = Math.floor(lat * 1000) / 1000;
  const longitude = Math.floor(lon * 1000) / 1000;
  return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1`;
}

export function WEATHER_CURRENT_WEATHER_URL(cityLat: number, cityLon: number, lang: string) {
  const lat: number = Math.floor(cityLat * 100) / 100;
  const lon: number = Math.floor(cityLon * 100) / 100;
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}`;
}

export function WEATHER_FORECAST_URL(cityLat: number, cityLon: number, lang: string) {
  const lat: number = Math.floor(cityLat * 100) / 100;
  const lon: number = Math.floor(cityLon * 100) / 100;
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}`;
}

export function GET_WEATHER_ICON_URL(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}.png`;
}
