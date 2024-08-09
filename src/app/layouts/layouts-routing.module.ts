import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MachineComponent } from './pages/machine/machine.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { PartComponent } from './pages/part/part.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'monitoring/:hos',
    component: HospitalComponent
  },
  {
    path: 'monitoring/:hos/:mach',
    component: MachineComponent
  },
  {
    path: 'monitoring/:hos/:mach/:part',
    component: PartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
