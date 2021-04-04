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

@NgModule({
  declarations: [
    AppComponent,
    RewardListComponent,
    NewDecorationComponent,
    RewardNewComponent,
    NewAvatarComponent,
    NewZoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
