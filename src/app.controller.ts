import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './services/app.service';
import { Land } from './models/land.model';

interface Response {
  count: {
    direct: number;
    indirect: number;
  };
  results: {
    direct: Land[];
    indirect: Land[];
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':companyId')
  get(@Param('companyId') companyId: string): Response {
    const direct= this.appService.getDirectLands(companyId);
    const indirect =this.appService.getIndirectLands(companyId);
    return {
      count: {
        direct: direct.length,
        indirect: indirect.length
      },
      results: {
        direct, 
        indirect
      }
    }
  }
}
