import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RewardListComponent} from './views/reward-list/reward-list.component';
import {RewardNewComponent} from './views/reward-new/reward-new.component';
import {LandingComponent} from './views/landing/landing.component';
import {SignupComponent} from './views/signup/signup.component';
import {ConfirmComponent} from './views/confirm/confirm.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';
import {EmailParamGuard} from './guards/email-param.guard';
import {AdminGuard} from './guards/admin.guard';
import {NoGroupComponent} from './views/no-group/no-group.component';
import {InviteComponent} from './views/invite/invite.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [UnauthGuard, EmailParamGuard]
  },
  {
    path: 'no-group',
    component: NoGroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'districts/:districtId',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'groups/:groupId',
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'invitation',
            component: InviteComponent
          },
          {
            path: '**',
            redirectTo: 'dashboard'
          },
        ]
      }
    ]
  },
  {
    path: 'rewards',
    children: [
      {
        path: '',
        component: RewardListComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'new',
        component: RewardNewComponent,
        canActivate: [AuthGuard, AdminGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
