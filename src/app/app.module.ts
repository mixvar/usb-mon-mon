import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './components/app.component';
import IUsbMonMonConnector from './services/usb-mon-mon-conector.service.interface';
import { UsbMonMonConnector } from './services/usb-mon-mon-connector.service';
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
    { provide: IUsbMonMonConnector, useClass: UsbMonMonConnector },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
