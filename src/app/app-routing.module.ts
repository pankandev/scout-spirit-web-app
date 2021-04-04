import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RewardListComponent} from './views/reward-list/reward-list.component';
import {RewardNewComponent} from './views/reward-new/reward-new.component';

const routes: Routes = [
  {
    path: 'rewards',
    children: [
      {
        path: '',
        component: RewardListComponent
      },
      {
        path: 'new',
        component: RewardNewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
