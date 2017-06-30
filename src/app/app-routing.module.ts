import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { PacketsLogComponent } from './components/packets-log/packets-log.component';
import { StatisticsComponent } from './components/packets-log/statistics/statistics.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/packets-log',
    pathMatch: 'full'
  },
  {
    path: 'packets-log',
    component: PacketsLogComponent
  },
  // {
  //   path: 'statistics',
  //   component: StatisticsComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
