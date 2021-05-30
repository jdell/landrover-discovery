import { Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';

@Injectable()
export class CompanyProvider {
    get(): Company[] {
        const fs = require("fs");
        const companies = fs.readFileSync("./data/company_relations.csv", "utf8")
          .split("\n")
          .slice(1) // header row
          .map((line) => {
            const [id, name, parentId] = line.split(",");
            return {id, name, parentId}
          })
        return companies;
    }
}
