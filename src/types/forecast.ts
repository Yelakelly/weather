export interface WeatherGeoPosition {
  district: {
    id: number;
    name: string;
  };
  locality: {
    id: number;
    name: string;
  };
  province: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
}

export interface WeatherForecastDay {
  _source: string;
  temp_min: number;
  temp_avg: number;
  temp_max: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: string;
  condition: string;
  uv_index: number;
  feels_like: number;
  daytime: string;
  polar: boolean;
  fresh_snow_mm: number;
}

export interface WeatherApiResponse {
  now: number; // timestamp in seconds
  now_dt: string; // date and time in ISO 8601 format
  geo_object: WeatherGeoPosition;
  fact: {
    temp: number; // temperature in degrees Celsius
    feels_like: number; // perceived temperature in degrees Celsius
    icon: string; // string code for weather icon
    condition: string; // text description of weather conditions
    wind_speed: number; // wind speed in meters per second
    wind_gust?: number; // gust speed in meters per second (optional)
    wind_dir: string; // wind direction as a string code
    pressure_mm: number; // atmospheric pressure in millimeters of mercury
    pressure_pa: number; // atmospheric pressure in pascals
    humidity: number; // relative humidity as a percentage
    daytime: string; // "d" for day or "n" for night
    polar?: boolean; // indicates whether this is a polar day or night (optional)
    season?: string; // string code for the season (optional)
    obs_time: number; // observation time in seconds
  };
  info: {
    n: boolean;
    geoid: number;
    url: string;
    lat: number;
    lon: number;
    tzinfo: {
      name: string;
      abbr: string;
      dst: boolean;
      offset: number;
    };
    def_pressure_mm: number;
    def_pressure_pa: number;
    slug: string;
    zoom: number;
    nr: boolean;
    ns: boolean;
    nsr: boolean;
    p: boolean;
    f: boolean;
    _h: boolean;
  };
  forecasts: {
    date: string;
    date_ts: number;
    week: number;
    sunrise: string;
    sunset: string;
    rise_begin: string;
    set_end: string;
    moon_code: number;
    moon_text: string;
    parts: {
      day: WeatherForecastDay;
    };
  }[];
}
