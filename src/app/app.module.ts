import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdDialogModule, MdCheckboxModule, MdSlideToggleModule } from '@angular/material';

import { AppComponent } from './components/app.component';
import IUsbMonMonConnector from './services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { UsbMonMonConnector } from './services/usb-mon-mon-connector/usb-mon-mon-connector.service';
import IPacketsService from './services/packets/packets.service.interface';
import { PacketsService } from './services/packets/packets.service';
import { MomentPipe } from './pipes/moment.pipe';
import { HeaderComponent } from './components/header/header.component';
import { PacketsLogComponent } from './components/packets-log/packets-log.component';
import { PacketComponent } from './components/packets-log/packet/packet.component';
import { PacketDetailsComponent } from './components/packets-log/packet-details/packet-details.component';
import { PacketFiltersComponent } from './components/packets-log/packet-filters/packet-filters.component';
import IPacketFilterService from './services/packet-filter/packet-filter.service.interface';
import { PacketFilterService } from 'app/services/packet-filter/packet-filter.service';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    MomentPipe,
    HeaderComponent,
    PacketsLogComponent,
    PacketComponent,
    PacketDetailsComponent,
    PacketFiltersComponent
  ],
  entryComponents: [
    PacketDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(socketConfig),
    BrowserAnimationsModule,
    MdButtonModule,
    MdDialogModule,
    MdCheckboxModule,
    MdSlideToggleModule,
  ],
  providers: [
    { provide: IUsbMonMonConnector, useClass: UsbMonMonConnector },
    { provide: IPacketsService, useClass: PacketsService },
    { provide: IPacketFilterService, useClass: PacketFilterService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
