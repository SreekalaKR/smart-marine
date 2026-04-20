import { Module } from '@nestjs/common';
import { VslVesselModule } from './vsl_vessel/vsl_vessel.module';
import { usersModule } from './users/users.module';

@Module({
  imports: [VslVesselModule, usersModule]
})
export class ModuleModule { }
