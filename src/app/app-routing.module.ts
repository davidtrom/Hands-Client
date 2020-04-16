import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './layout/about/about.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { VolunteerLoginComponent } from './volunteers/volunteer-login/volunteer-login.component';
import { NewVolunteerComponent } from './volunteers/new-volunteer/new-volunteer.component';
import { RecipientLoginComponent } from './recipient/recipient-login/recipient-login.component';
import { NewRecipientComponent } from './recipient/new-recipient/new-recipient.component';
import { DisplayRequestsComponent } from './requests/display-requests/display-requests.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';
import { EditVolunteerComponent } from './volunteers/edit-volunteer/edit-volunteer.component';
import { EditRecipientComponent } from './recipient/edit-recipient/edit-recipient.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditRecippwComponent } from './recipient/edit-recippw/edit-recippw.component';
import { EditVolpwComponent } from './volunteers/edit-volpw/edit-volpw.component';
import { RequestorDashboardComponent } from './recipient/requestor-dashboard/requestor-dashboard.component';
import { VolRequestsComponent } from './volunteers/vol-requests/vol-requests.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'about', component: AboutComponent},
  { path: 'volunteer-login', component: VolunteerLoginComponent},
  { path: 'new-volunteer', component: NewVolunteerComponent},
  { path: 'requestor-login', component: RecipientLoginComponent},
  { path: 'new-client', component: NewRecipientComponent},
  { path: 'display-requests', component: DisplayRequestsComponent},
  { path: 'request-detail/:id', component: RequestDetailComponent},
  { path: 'edit-volunteer/:id', component: EditVolunteerComponent},
  { path: 'edit-recipient/:id', component: EditRecipientComponent},
  { path: 'view-profile', component: ViewProfileComponent},
  { path: 'edit-reqpw/:id', component: EditRecippwComponent},
  { path: 'edit-volpw/:id', component: EditVolpwComponent},
  { path: 'req-dashboard', component: RequestorDashboardComponent},
  { path: 'vol-requests/:id', component: VolRequestsComponent},


  
  // if no route, redirect to home
  { path: '**', redirectTo: '' }
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

