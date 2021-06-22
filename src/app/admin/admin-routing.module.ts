import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {RewardListComponent} from './views/reward-list/reward-list.component';
import {AuthGuard} from '../guards/auth.guard';
import {AdminGuard} from '../guards/admin.guard';
import {GroupsSearchComponent} from './views/groups-search/groups-search.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'rewards',
        children: [
          {
            path: '',
            component: RewardListComponent,
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      },
      {
        path: 'groups',
        component: GroupsSearchComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
