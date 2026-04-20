import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { VesselRoutingModule } from './vessel-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { VesselListComponent } from './components/vessel-list/vessel-list.component';
import { VesselcreationComponent } from './components/vessel-creation/vesselcreation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UploadDataComponent } from './components/upload-data/upload-data.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    VesselListComponent,
    VesselcreationComponent,
    UploadDataComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    VesselRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ]
})
export class VesselModule { }
