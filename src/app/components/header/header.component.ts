import { Component, OnInit } from '@angular/core';

import IUsbMonMonConnector from '../../services/usb-mon-mon-connector/usb-mon-mon-conector.service.interface';
import { AppStatus } from '../../model/app-status';


@Component({
  selector: 'umm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appStatus: string;

  constructor(
    private ummConnector: IUsbMonMonConnector,
  ) { }

  ngOnInit() {
    this.ummConnector.getStatus_().subscribe(
      (status: AppStatus) => {
        console.warn(`server status: ${AppStatus[status]}`);
        this.appStatus = AppStatus[status];
      }
    );
  }

}
