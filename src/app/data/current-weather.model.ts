import { Condition, Hour } from "./weather-hour.model";


    export interface Location {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    }



    export interface Current {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: Condition;
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    }

   


    export interface Forecastday {
        date: string;
        date_epoch: number;
        hour: Hour[];
    }

    export interface Forecast {
        forecastday: Forecastday[];
    }

    export interface CurrentWeather {
        location: Location;
        current: Current;
        forecast: Forecast;
    }

