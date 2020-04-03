import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { NewRecipientComponent } from './new-recipient/new-recipient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VolunteerLoginComponent } from './volunteer-login/volunteer-login.component';
import { RecipientLoginComponent } from './recipient-login/recipient-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    NewVolunteerComponent,
    NewRecipientComponent,
    DashboardComponent,
    VolunteerLoginComponent,
    RecipientLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
