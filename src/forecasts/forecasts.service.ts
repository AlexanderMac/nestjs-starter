import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ForecastsResult, LocationDto } from './models';

interface AxiosResponse {
  data: any;
}

interface OpenMeteoForecastsResult {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
  };
}

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

@Injectable()
export class ForecastsService {
  constructor(private readonly httpService: HttpService) {}

  getForecast(userId: string, location: LocationDto): Observable<ForecastsResult> {
    return this.httpService
      .get(BASE_URL, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          current_weather: true,
          timezone: 'Europe/London',
        },
      })
      .pipe(map((res: AxiosResponse) => this.openMeteoToInternal(userId, res.data as OpenMeteoForecastsResult)));
  }

  private openMeteoToInternal(userId: string, openMeteoData: OpenMeteoForecastsResult): ForecastsResult {
    return {
      userId,
      forecast: {
        latitude: openMeteoData.latitude,
        longitude: openMeteoData.longitude,
        timezone: openMeteoData.timezone,
        time: openMeteoData.current_weather.time,
        temperature: openMeteoData.current_weather.temperature,
      },
    } as ForecastsResult;
  }
}
