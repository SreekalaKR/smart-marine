import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselcreationComponent } from './components/vessel-creation/vesselcreation.component';
import { VesselListComponent } from './components/vessel-list/vessel-list.component';
import { UploadDataComponent } from './components/upload-data/upload-data.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'vessel-list', component: VesselListComponent },
  { path: 'vessel-creation', component: VesselcreationComponent },
  //////
  { path: 'upload-data', component: UploadDataComponent },

  ///////

  { path: 'vessel-creation/:vesselNo', component: VesselcreationComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselRoutingModule { }
