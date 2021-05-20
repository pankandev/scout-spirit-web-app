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
import { NewAvatarComponent } from './widgets/new-avatar/new-avatar.component';
import { NewZoneComponent } from './widgets/new-zone/new-zone.component';
import { HomeComponent } from './views/home/home.component';
import { LandingComponent } from './views/landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoComponent } from './widgets/logo/logo.component';
import { LoginPanelComponent } from './widgets/login-panel/login-panel.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SignupPanelComponent } from './widgets/signup/signup-panel.component';
import { SignupComponent } from './views/signup/signup.component';
import { ConfirmComponent } from './views/confirm/confirm.component';
import { ConfirmPanelComponent } from './widgets/confirm-panel/confirm-panel.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NoGroupComponent } from './views/no-group/no-group.component';
import { NoGroupPanelComponent } from './widgets/no-group-panel/no-group-panel.component';
import { InviteComponent } from './views/invite/invite.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    InviteComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
