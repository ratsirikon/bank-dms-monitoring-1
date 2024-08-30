import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalComponent } from './layouts/pages/monitoring/hospital/hospital.component';
import { MachineComponent } from './layouts/pages/monitoring/machine/machine.component';
import { PartComponent } from './layouts/pages/monitoring/part/part.component';
import { AddMachineComponent } from './layouts/pages/form/add-machine/add-machine.component';
import { AddSensorComponent } from './layouts/pages/form/add-sensor/add-sensor.component';
import { AddPartComponent } from './layouts/pages/form/add-part/add-part.component';


@Injectable()
export class SocketHome extends Socket {
  constructor() {
    super({ url: environment.API_SOCKET_ENDPOINT, options: { path: '/api/machine', autoConnect: true } })
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutsComponent,
    HomeComponent,
    HospitalComponent,
    MachineComponent,
    PartComponent,
    AddMachineComponent,
    AddPartComponent,
    AddSensorComponent
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
    MatSortModule
  ],
  providers: [SocketHome],
  bootstrap: [AppComponent]
})
export class AppModule { }
