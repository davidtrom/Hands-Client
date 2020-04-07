import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './layout/about/about.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { VolunteerLoginComponent } from './volunteer-login/volunteer-login.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { RecipientLoginComponent } from './recipient/recipient-login/recipient-login.component';
import { NewRecipientComponent } from './recipient/new-recipient/new-recipient.component';
import { DisplayRequestsComponent } from './requests/display-requests/display-requests.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'about', component: AboutComponent},
  { path: 'volunteer-login', component: VolunteerLoginComponent},
  { path: 'new-volunteer', component: NewVolunteerComponent},
  { path: 'client-login', component: RecipientLoginComponent},
  { path: 'new-client', component: NewRecipientComponent},
  { path: 'display-requests', component: DisplayRequestsComponent},
  { path: 'request-detail/:id', component: RequestDetailComponent},

  
  // if no route, redirect to home
  { path: '**', redirectTo: '' }
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

