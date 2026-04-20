import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'vessel',pathMatch:'full'},
  {
    path:'vessel',
    loadChildren:()=>import('./modules/vessel/vessel.module').then((mod) => mod.VesselModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
