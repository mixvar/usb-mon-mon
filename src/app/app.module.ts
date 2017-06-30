import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdDialogModule, MdCheckboxModule, MdSlideToggleModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './components/app.component';
import IUsbMonMonConnector from './services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { UsbMonMonConnector } from './services/usb-mon-mon-connector/usb-mon-mon-connector.service';
import IPacketsService from './services/packets/packets.service.interface';
import { PacketsService } from './services/packets/packets.service';
import { MomentPipe } from './pipes/moment.pipe';
import { HeaderComponent } from './components/header/header.component';
import { PacketsLogComponent } from './components/packets-log/packets-log.component';
import { PacketComponent } from './components/packets-log/packets-list/packet/packet.component';
import { PacketDetailsComponent } from './components/packets-log/packets-list/packet-details/packet-details.component';
import { PacketFiltersComponent } from './components/packets-log/packet-filters/packet-filters.component';
import IPacketFilterService from './services/packet-filter/packet-filter.service.interface';
import { PacketFilterService } from 'app/services/packet-filter/packet-filter.service';
import { StatisticsComponent } from './components/packets-log/statistics/statistics.component';
import { AppRoutingModule } from 'app/app-routing.module';
import IChartsService from './services/charts/charts.service.interface';
import { ChartsService } from 'app/services/charts/charts.service';
import { PacketsListComponent } from './components/packets-log/packets-list/packets-list.component';

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
    PacketFiltersComponent,
    StatisticsComponent,
    PacketsListComponent
  ],
  entryComponents: [
    PacketDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketConfig),
    BrowserAnimationsModule,
    MdButtonModule,
    MdDialogModule,
    MdCheckboxModule,
    MdSlideToggleModule,
    ChartsModule
  ],
  providers: [
    { provide: IUsbMonMonConnector, useClass: UsbMonMonConnector },
    { provide: IPacketsService, useClass: PacketsService },
    { provide: IPacketFilterService, useClass: PacketFilterService },
    { provide: IChartsService, useClass: ChartsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
