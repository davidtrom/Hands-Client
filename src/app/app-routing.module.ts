import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  
  // if no route, redirect to home
  { path: '**', redirectTo: '' }
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

