import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './components/app.component';
import IUsbMonMonConnector from './services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { UsbMonMonConnector } from './services/usb-mon-mon-connector/usb-mon-mon-connector.service';
import IPacketsService from './services/packets/packets.service.interface';
import { PacketsService } from './services/packets/packets.service';
import { MomentPipe } from './pipes/moment.pipe';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PacketComponent } from './components/dashboard/packet/packet.component';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    MomentPipe,
    HeaderComponent,
    DashboardComponent,
    PacketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [
    { provide: IUsbMonMonConnector, useClass: UsbMonMonConnector },
    { provide: IPacketsService, useClass: PacketsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
