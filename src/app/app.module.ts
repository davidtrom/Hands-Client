import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './layout/about/about.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NewVolunteerComponent } from './volunteers/new-volunteer/new-volunteer.component';
import { NewRecipientComponent } from './recipient/new-recipient/new-recipient.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { VolunteerLoginComponent } from './volunteers/volunteer-login/volunteer-login.component';
import { RecipientLoginComponent } from './recipient/recipient-login/recipient-login.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayRequestsComponent } from './requests/display-requests/display-requests.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';
import { EditVolunteerComponent } from './volunteers/edit-volunteer/edit-volunteer.component';
import { EditRecipientComponent } from './recipient/edit-recipient/edit-recipient.component';
import { EditVolpwComponent } from './volunteers/edit-volpw/edit-volpw.component';
import { EditRecippwComponent } from './recipient/edit-recippw/edit-recippw.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RequestorDashboardComponent } from './recipient/requestor-dashboard/requestor-dashboard.component';
import { CreateRequestComponent } from './requests/create-request/create-request.component';
import { VolRequestsComponent } from './volunteers/vol-requests/vol-requests.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecipRequestsComponent } from './recipient/recip-requests/recip-requests.component';
import { UpdateVolEmailComponent } from './update-vol-email/update-vol-email.component';


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
    RequestDetailComponent,
    EditVolunteerComponent,
    EditRecipientComponent,
    EditVolpwComponent,
    EditRecippwComponent,
    ViewProfileComponent,
    RequestorDashboardComponent,
    CreateRequestComponent,
    VolRequestsComponent,
    ForgotPasswordComponent,
    RecipRequestsComponent,
    UpdateVolEmailComponent
    
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
