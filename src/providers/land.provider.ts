import { Injectable } from '@nestjs/common';
import { Land } from '../models/land.model';

@Injectable()
export class LandProvider {
    get(): Land[] {
        const fs = require("fs");
        const lands = fs.readFileSync("./data/land_ownership.csv", "utf8")
          .split("\n")
          .slice(1) // header row
          .map((line) => {
            const [landId, companyId] = line.split(",");
            return { landId, companyId };
        });
        return lands;
    }
}
