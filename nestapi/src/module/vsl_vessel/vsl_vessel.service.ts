import { Injectable, NotFoundException } from '@nestjs/common';//The Injectable decorator is used to mark the class as an injectable service, and the NotFoundException is an exception that can be thrown when a resource is not found.
import { InjectRepository } from '@nestjs/typeorm';//The InjectRepository decorator is used for injecting the TypeORM repository into the service.
import { Repository } from 'typeorm';//The Repository class is a generic class provided by TypeORM for interacting with the database.
import { vsl_vessel } from './vsl_vessel.entity';


//import * as fs from 'fs';
//import * as csvParser from 'csv-parser';
import { CsvParser } from 'nest-csv-parser';
import { parse } from 'papaparse';

@Injectable()
export class vsl_vesselService {


  constructor(
    @InjectRepository(vsl_vessel)
    private vsl_vesselRepository: Repository<vsl_vessel>,
    private readonly csvParser: CsvParser,
  ) { }



  async createVessel(vsl_vesselData: Partial<vsl_vessel>): Promise<vsl_vessel> {
    const vsl_vessel = await this.vsl_vesselRepository.create(vsl_vesselData);
    const cres = await this.vsl_vesselRepository.save(vsl_vessel);
    return cres;
  }


  async findVesselByNo(vesselNo: string): Promise<vsl_vessel> {
    const res = await this.vsl_vesselRepository.findOne({ where: { vesselNo } });
    return res;
  }


  async updateVessel(vesselNo: string, updatedVessel: Partial<vsl_vessel>): Promise<vsl_vessel> {
    const existingVessel = await this.vsl_vesselRepository.findOne({ where: { vesselNo } });

    if (!existingVessel) {
      throw new NotFoundException(`Vessel with '${vesselNo}'not found`);
    }

    const mergedVessel = { ...existingVessel, ...updatedVessel };
    const updated = await this.vsl_vesselRepository.save(mergedVessel);
    console.log(updated);
    return updated;
  }


  async deleteVessel(vesselNo: string): Promise<void> {
    const existingVessel = await this.vsl_vesselRepository.findOne({ where: { vesselNo } });

    if (!existingVessel) {
      throw new NotFoundException(`Vessel with '${vesselNo}'not found`);
    }

    await this.vsl_vesselRepository.remove(existingVessel);
  }

  async getAllVessels(): Promise<vsl_vessel[]> {
    const existingVessel = await this.vsl_vesselRepository.find();
    return existingVessel;
  }

  ///////////////////////////

  async saveCsvData(file: Express.Multer.File): Promise<number> {

    const fileBuffer = file.buffer;
    const csvString = fileBuffer.toString();

    const results = parse(csvString, {
      header: true,
    });

    let savedRows = 0;

    for (const row of results.data) {
      const vessel = new vsl_vessel();

      //console.log(row);

      if (row['vesselName'] == '') {
        break;
      }
      vessel.vesselName = row['vesselName'];
      vessel.vesselNo = row['vesselNo'];
      vessel.vesselFlag = row['vesselFlag'];
      vessel.vesselType = row['vesselType'];
      vessel.vesselClass = row['vesselClass'];
      vessel.masterEmail = row['masterEmail'];
      vessel.isEeoiOnly = row['isEeoiOnly'] === 'true';
      vessel.ownershipStatus = row['ownershipStatus'];
      vessel.marineShipType = row['marineShipType'];
      vessel.companyCode = 'BWDRY';
      vessel.createdBy = null;
      vessel.createdTime = null;
      vessel.dwt = null;
      vessel.fleetGroupCode = null;
      vessel.fleetProfileCode = null;
      vessel.isActive = null;
      vessel.isInternalOnly = null;
      vessel.isNewVessel = null;
      vessel.isPerfVsl = null;
      vessel.isTcRelet = null;
      vessel.modifiedBy = null;
      vessel.modifiedTime = null;
      vessel.operatorBuEmail = null;
      vessel.operatorEmail = null;
      vessel.operatorName = null;
      vessel.ownerCompany = null;
      vessel.ownerContactDetails = null;
      vessel.pic = null;
      vessel.sisterVessels = null;
      vessel.vmHtmlUrl = null;

      await this.vsl_vesselRepository.save(vessel);
      savedRows++;
    }
    return savedRows;

  }

  async checkVesselNoAvailability(vesselNo: string, companyCode: string): Promise<boolean> {
    const existingVessel = await this.vsl_vesselRepository.findOne({ where: { vesselNo, companyCode } });
    //console.log(!!existingVessel);
    return !!existingVessel;
  }

}
