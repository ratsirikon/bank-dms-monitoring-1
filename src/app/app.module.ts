import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layouts/pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LayoutsComponent } from './layouts/layouts.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalComponent } from './layouts/pages/monitoring/hospital/hospital.component';
import { MachineComponent } from './layouts/pages/monitoring/machine/machine.component';
import { PartComponent } from './layouts/pages/monitoring/part/part.component';
import { AddMachineComponent } from './layouts/pages/form/add-machine/add-machine.component';
import { AddSensorComponent } from './layouts/pages/form/add-sensor/add-sensor.component';
import { AddPartComponent } from './layouts/pages/form/add-part/add-part.component';
import { EditHospitalComponent } from './layouts/pages/form/edit-hospital/edit-hospital.component';
import { EditMachineComponent } from './layouts/pages/form/edit-machine/edit-machine.component';
import { EditPartComponent } from './layouts/pages/form/edit-part/edit-part.component';
import { EditSensorComponent } from './layouts/pages/form/edit-sensor/edit-sensor.component';


@Injectable()
export class SocketHome extends Socket {
  constructor() {
    super({ url: environment.API_SOCKET_ENDPOINT, options: { path: '/api/machine', autoConnect: true } })
  }
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    HospitalComponent,
    MachineComponent,
    PartComponent,
    AddMachineComponent,
    AddPartComponent,
    AddSensorComponent,
    EditHospitalComponent,
    EditMachineComponent,
    EditPartComponent,
    EditSensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule,
    FormsModule,
    ReactiveFormsModule,


    // Material Component
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule
  ],
  providers: [SocketHome],
  bootstrap: [AppComponent]
})
export class AppModule { }
