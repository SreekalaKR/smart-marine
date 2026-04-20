import { Module } from '@nestjs/common';
import { usersController } from './users.controller';
import { usersService } from './users.service';
import { users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([users])],
  controllers: [usersController],
  providers: [usersService]
})
export class usersModule { }

