import { Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';
import { Land } from '../models/land.model';
import { CompanyProvider } from '../providers/company.provider';
import { LandProvider } from '../providers/land.provider';

@Injectable()
export class AppService {
  private companies: Company[];
  private lands: Land[];

  constructor(companyProvider: CompanyProvider, landProvider: LandProvider){
    this.companies = companyProvider.get();
    this.lands = landProvider.get();
  }
  
  /**
   * Get the list of direct lands for a given company
   */
  getDirectLands(companyId: string): Land[] {
    return this.lands.filter(land => land.companyId === companyId);
  }
  
  /**
   * Get the list of indirect lands for a given company
   */
  getIndirectLands(companyId: string): Land[] {
    const initialValue = []; 
     // If we want ALL lands -direct+indirect-, we could initialize the array 
     // with [...getDirectLands(companyId) ]) and remove the call from line 34

    const lands = this.companies.reduce((acc, item)=> {
        if (item.parentId === companyId) {
            acc.push(...this.getDirectLands(item.id))
            acc.push(...this.getIndirectLands(item.id))
        }
        return acc;
    }, initialValue);
   
    return lands;
  }
}
