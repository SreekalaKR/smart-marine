import { Module } from '@nestjs/common';
import { vsl_vesselController } from './vsl_vessel.controller';//The controller is responsible for handling incoming requests and returning responses.
import { vsl_vesselService } from './vsl_vessel.service';//The service contains the business logic for the vsl_vessel feature.

import { TypeOrmModule } from '@nestjs/typeorm';//TypeOrmModule is used for integrating the TypeORM library into the Nest.js application.
import { vsl_vessel } from './vsl_vessel.entity';//the entity represents a database table or collection and is used with the TypeORM module.

import { CsvParser } from 'nest-csv-parser';
@Module({
  imports: [TypeOrmModule.forFeature([vsl_vessel])
  ],
  controllers: [vsl_vesselController],
  providers: [vsl_vesselService, CsvParser]
})
export class VslVesselModule { }

export { vsl_vessel };
