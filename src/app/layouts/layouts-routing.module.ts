import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddHospitalComponent } from './pages/form/add-hospital/add-hospital.component';
import { HospitalComponent } from './pages/monitoring/hospital/hospital.component';
import { MachineComponent } from './pages/monitoring/machine/machine.component';
import { PartComponent } from './pages/monitoring/part/part.component';
import { AddMachineComponent } from './pages/form/add-machine/add-machine.component';
import { AddSensorComponent } from './pages/form/add-sensor/add-sensor.component';
import { AddPartComponent } from './pages/form/add-part/add-part.component';

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
  {
    path: 'form/add-hospital',
    component: AddHospitalComponent
  },
  {
    path: 'form/add-machine',
    component: AddMachineComponent
  },
  {
    path: 'form/add-part',
    component: AddPartComponent
  },
  {
    path: 'form/add-sensor',
    component: AddSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
