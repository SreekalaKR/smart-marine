import { Module } from '@nestjs/common';//used to define a module in Nest.js
import { AppController } from './app.controller';//controller is responsible for handling incoming requests and returning responses.
import { AppService } from './app.service';// service contains the business logic for the application
import { TypeOrmModule } from '@nestjs/typeorm';//used for integrating the TypeORM library into the Nest.js application
import { ModuleModule } from './module/module.module';//represents another module in the application that is imported and included in the root module
//import { ModuleNameModule } from './module-name/module-name.module';
//import {ModuleNameModule} from './module/'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root1',
      database: 'vessel',
      autoLoadEntities: true,
      synchronize: true,

    }),
    ModuleModule,
    //ModuleNameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

/*
The AppModule serves as the entry point of the application, where other modules, controllers, and services are imported and configured. 
The TypeOrmModule.forRoot method is used to configure the connection to a PostgreSQL database.
 The synchronize option is set to true, which automatically creates database tables and performs schema synchronization. 
The autoLoadEntities option is set to true, which automatically loads entity classes from the specified directories.
*/