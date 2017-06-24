import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';

import {AppComponent} from './components/app.component';
import IUsbPacketsService from './services/usb-packets.service.interface';
import {UsbPacketsService} from './services/usb-packets.service';
import { MomentPipe } from './pipes/moment.pipe';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [
    {provide: IUsbPacketsService, useClass: UsbPacketsService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
