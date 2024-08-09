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
import { MachineComponent } from './layouts/pages/machine/machine.component';
import { FormsModule } from '@angular/forms';
import { HospitalComponent } from './layouts/pages/hospital/hospital.component';
import { PartComponent } from './layouts/pages/part/part.component';
import { BasketPullerComponent } from './layouts/template/template_machine/basket-puller/basket-puller.component';
import { SortingComponent } from './layouts/template/template_machine/sorting/sorting.component';
import { PartPullerComponent } from './layouts/template/template_part/part-puller/part-puller.component';
import { PartSortingComponent } from './layouts/template/template_part/part-sorting/part-sorting.component';


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
    BasketPullerComponent,
    SortingComponent,
    PartSortingComponent,
    PartPullerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule,
    FormsModule,


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
