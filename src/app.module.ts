import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { CompanyProvider } from './providers/company.provider';
import { LandProvider } from './providers/land.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CompanyProvider, LandProvider],
})
export class AppModule {}
