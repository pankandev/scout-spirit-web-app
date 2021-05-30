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
import {BeneficiariesComponent} from './views/dashboard/beneficiaries/beneficiaries.component';
import {SummaryComponent} from './views/dashboard/summary/summary.component';
import {ScoutersComponent} from './views/dashboard/scouters/scouters.component';
import {NoGroupGuard} from './guards/no-group.guard';
import {GroupGuard} from './guards/group.guard';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {ForbiddenGroupComponent} from './views/forbidden-group/forbidden-group.component';

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
    canActivate: [AuthGuard, NoGroupGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
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
            path: '',
            component: ForbiddenGroupComponent
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [GroupGuard],
            children: [
              {
                path: 'summary',
                component: SummaryComponent
              },
              {
                path: 'beneficiaries',
                children: [
                  {
                    path: '',
                    component: BeneficiariesComponent
                  },
                  {
                    path: ':unit',
                    component: BeneficiariesComponent
                  }
                ]
              },
              {
                path: 'scouters',
                component: ScoutersComponent
              },
              {
                path: '**',
                redirectTo: 'summary'
              }
            ]
          },
          {
            path: 'invite',
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
