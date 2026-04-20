import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { vsl_vesselService } from './vsl_vessel.service';
import { vsl_vessel } from './vsl_vessel.entity';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import * as multer from 'multer';
import * as csvParser from 'csv-parser';



@Controller('vsl_vessel')
export class vsl_vesselController {
  //uploadService: any;

  constructor(private readonly vsl_vesselService: vsl_vesselService) { }

  @Post()
  async create(@Body() vsl_vesselData: Partial<vsl_vessel>): Promise<vsl_vessel> {
    return this.vsl_vesselService.createVessel(vsl_vesselData);
  }

  @Get(':vesselNo')
  async findVesselByNo(@Param('vesselNo') vesselNo: string): Promise<vsl_vessel> {
    return this.vsl_vesselService.findVesselByNo(vesselNo);
  }

  @Get()
  async getAllVessels(): Promise<vsl_vessel[]> {
    return this.vsl_vesselService.getAllVessels();
  }

  @Put(':vesselNo')
  async updateVessel(@Param('vesselNo') vesselNo: string, @Body() updatedVessel: Partial<vsl_vessel>): Promise<vsl_vessel> {
    return this.vsl_vesselService.updateVessel(vesselNo, updatedVessel);
  }

  @Delete(':vesselNo')
  async deleteVessel(@Param('vesselNo') vesselNo: string): Promise<void> {
    return this.vsl_vesselService.deleteVessel(vesselNo);
  }



  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File, @Res() res: Response): Promise<void> {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const savedRows = await this.vsl_vesselService.saveCsvData(file);
    res.json({ message: `Successfully saved ${savedRows} rows from csv file.` });
  }

  @Get('check-availability/:vesselNo/:companyCode')
  async checkVesselNoAvailability(@Param('vesselNo') vesselNo: string, @Param('companyCode') companyCode: string): Promise<boolean> {
    return this.vsl_vesselService.checkVesselNoAvailability(vesselNo, companyCode);
  }


}









