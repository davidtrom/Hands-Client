import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { NewRecipientComponent } from './new-recipient/new-recipient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VolunteerLoginComponent } from './volunteer-login/volunteer-login.component';
import { RecipientLoginComponent } from './recipient-login/recipient-login.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayRequestsComponent } from './display-requests/display-requests.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    NewVolunteerComponent,
    NewRecipientComponent,
    DashboardComponent,
    VolunteerLoginComponent,
    RecipientLoginComponent,
    DisplayRequestsComponent,
    RequestDetailComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
