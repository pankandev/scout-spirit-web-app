import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import {RewardListComponent} from './views/reward-list/reward-list.component';
import {NewDecorationComponent} from './widgets/new-decoration/new-decoration.component';
import {RewardNewComponent} from './views/reward-new/reward-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {NewAvatarComponent} from './widgets/new-avatar/new-avatar.component';
import {NewZoneComponent} from './widgets/new-zone/new-zone.component';
import {HomeComponent} from './views/home/home.component';
import {LandingComponent} from './views/landing/landing.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LogoComponent} from './widgets/logo/logo.component';
import {LoginPanelComponent} from './widgets/login-panel/login-panel.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SignupPanelComponent} from './widgets/signup/signup-panel.component';
import {SignupComponent} from './views/signup/signup.component';
import {ConfirmComponent} from './views/confirm/confirm.component';
import {ConfirmPanelComponent} from './widgets/confirm-panel/confirm-panel.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {NoGroupComponent} from './views/no-group/no-group.component';
import {NoGroupPanelComponent} from './widgets/no-group-panel/no-group-panel.component';
import {InviteComponent} from './views/invite/invite.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BeneficiariesComponent} from './views/dashboard/beneficiaries/beneficiaries.component';
import {SummaryComponent} from './views/dashboard/summary/summary.component';
import {ScoutersComponent} from './views/dashboard/scouters/scouters.component';
import {MatRippleModule} from '@angular/material/core';
import {RadarChartComponent} from './widgets/radar-chart/radar-chart.component';
import {GroupSelectComponent} from './widgets/group-select/group-select.component';
import {LoaderComponent} from './views/loader/loader.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {ForbiddenGroupComponent} from './views/forbidden-group/forbidden-group.component';
import {LinearChartComponent} from './widgets/linear-chart/linear-chart.component';
import {AreaRankingComponent} from './widgets/area-ranking/area-ranking.component';
import {AreaIconComponent} from './widgets/area-icon/area-icon.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ScrollableListComponent } from './widgets/scrollable-list/scrollable-list.component';
import {MatListModule} from '@angular/material/list';
import { BeneficiariesSummaryComponent } from './views/dashboard/beneficiaries-summary/beneficiaries-summary.component';
import { UnitIconComponent } from './widgets/unit-icon/unit-icon.component';
import { AvatarPictureComponent } from './widgets/avatar-picture/avatar-picture.component';
import { TaskCardComponent } from './widgets/task-card/task-card.component';
import {ClipboardModule} from 'ngx-clipboard';
import { ButtonComponent } from './widgets/button/button.component';
import { SummaryDetailsComponent } from './views/summary-details/summary-details.component';
import { StageSelectComponent } from './widgets/stage-select/stage-select.component';
import { AreaSelectComponent } from './widgets/area-select/area-select.component';
import { UnitSelectComponent } from './widgets/unit-select/unit-select.component';
import { ObjectivesListComponent } from './widgets/objectives-list/objectives-list.component';
import {MatChipsModule} from '@angular/material/chips';
import { BeneficiariesFileComponent } from './views/beneficiaries-file/beneficiaries-file.component';
import { SelectButtonsComponent } from './widgets/select-buttons/select-buttons.component';
import { BeneficiaryBinnacleComponent } from './views/beneficiary-binnacle/beneficiary-binnacle.component';
import { BeneficiaryRegistryComponent } from './views/beneficiary-registry/beneficiary-registry.component';

@NgModule({
  declarations: [
    AppComponent,
    RewardListComponent,
    NewDecorationComponent,
    RewardNewComponent,
    NewAvatarComponent,
    NewZoneComponent,
    HomeComponent,
    LandingComponent,
    LogoComponent,
    LoginPanelComponent,
    SignupPanelComponent,
    SignupComponent,
    ConfirmComponent,
    ConfirmPanelComponent,
    DashboardComponent,
    NoGroupComponent,
    NoGroupPanelComponent,
    InviteComponent,
    BeneficiariesComponent,
    SummaryComponent,
    ScoutersComponent,
    RadarChartComponent,
    GroupSelectComponent,
    LoaderComponent,
    NotFoundComponent,
    ForbiddenGroupComponent,
    LinearChartComponent,
    AreaRankingComponent,
    AreaIconComponent,
    ScrollableListComponent,
    BeneficiariesSummaryComponent,
    UnitIconComponent,
    AvatarPictureComponent,
    TaskCardComponent,
    ButtonComponent,
    SummaryDetailsComponent,
    StageSelectComponent,
    AreaSelectComponent,
    UnitSelectComponent,
    ObjectivesListComponent,
    BeneficiariesFileComponent,
    SelectButtonsComponent,
    BeneficiaryBinnacleComponent,
    BeneficiaryRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgbModule,
    MatSnackBarModule,
    MatRippleModule,
    HttpClientModule,
    MatTooltipModule,
    MatListModule,
    ClipboardModule,
    NgbModalModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
