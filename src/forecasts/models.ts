import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class LocationDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}

export interface ForecastsResult {
  userId: string;
  forecast: {
    latitude: number;
    longitude: number;
    timezone: string;
    time: string;
    temperature: number;
  };
}
