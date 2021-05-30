import { Test, TestingModule } from '@nestjs/testing';
import { Company } from '../models/company.model';
import { Land } from '../models/land.model';
import { CompanyProvider } from '../providers/company.provider';
import { LandProvider } from '../providers/land.provider';
import { AppService } from './app.service';

class MockCompanyProvider {
  get() {
    return [{
      id: 'R297805899175',
      parentId: 'R590980645905'
    },{
      id: 'R652026353427',
      parentId: 'R590980645905'
    },{
      id: 'R6520263534123',
      parentId: 'R652026353427'
    }];
  }
}

class MockLandProvider {
  get() {
    return  [
      {
        landId: 'T100018863440',
        companyId: 'R590980645905',
      },
      {
        landId: 'T100030485625',
        companyId: 'C498567266942',
      },
      {
        landId: 'T100073722185',
        companyId: 'R297805899175',
      },
      {
        landId: 'T100075985035',
        companyId: 'R652026353427',
      },
      {
        landId: 'T100075985123',
        companyId: 'R6520263534123',
      }
    ];
  }
}

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: CompanyProvider, useClass: MockCompanyProvider },
        { provide: LandProvider, useClass: MockLandProvider },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('Direct Lands', () => {
    it('should return empty list', () => {
      const lands = service.getDirectLands('1');
      expect(lands.length).toEqual(0);
    });

    it('should return direct lands', () => {
      const lands = service.getDirectLands('R590980645905');
      expect(lands.length).toEqual(1);
    });
  });

  describe('Indirect Lands', () => {
    it('should return empty list', () => {
      const lands = service.getIndirectLands('1');
      expect(lands.length).toEqual(0);
    });

    it('should return indirect lands', () => {
      const lands = service.getIndirectLands('R590980645905');
      expect(lands.length).toEqual(3); // 2 sub-companies + 1 sub-sub company
    });
  });
});
