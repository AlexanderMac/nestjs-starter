import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { ForecastsService } from 'src/forecasts/forecasts.service';
import { ForecastsResult, LocationDto } from './models';

@UseGuards(JwtAuthGuard)
@Controller('forecasts')
export class ForecastsController {
  constructor(private forecastsSrvc: ForecastsService) {}

  @Get('/')
  getForecasts(@Request() req, @Query() location: LocationDto): Observable<ForecastsResult> {
    return this.forecastsSrvc.getForecast(req.user.userId, location);
  }
}
