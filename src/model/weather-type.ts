export type CurrentWeatherType = {
  coord: Object; //lon, lat
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string; //stations
  main: {
    temp: number; //note: temps in Kelvin
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    seal_level: number;
    gnd_level: number;
  };
  visibility: number; //in meter
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: { '1h': number };
  snow: { '1h': number };
  clouds: { all: number };
  dt: number; //unix, UTC
  sys: {
    type: string;
    id: string;
    country: string;
    sunset: Date;
    sunrise: Date;
  };
  timezone: number; //shift in second from UTC
  id: number;
  name: string;
  cod: number;
};

export type ForecastWeatherType = {
  cod: string;
  message: string;
  cnt: number; //# of timestamps returned
  list: [
    {
      dt: number; //unix UTC
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number; //intrernal
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      rain: {
        '3h': number;
      };
      snow: {
        '3h': number;
      };
      sys: {
        pod: string;
      };
      dt_txt: string;
    }
  ];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: string;
    timezone: number; //shift in second from UTC
    sunrise: number;
    sunset: number;
  };
};
