import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ForecastsController } from 'src/forecasts/forecasts.controller';
import { ForecastsService } from 'src/forecasts/forecasts.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get<number>('http.timeout'),
        maxRedirects: configService.get<number>('http.maxRedirects'),
      }),
    }),
  ],
  controllers: [ForecastsController],
  providers: [ForecastsService],
})
export class ForecastsModule {}
