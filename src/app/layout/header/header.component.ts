import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { Recipient } from 'src/app/models/Recipient';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //allLoggedOut: boolean = true;
  volIsLoggedIn: boolean;
  recipIsLoggedIn: boolean;
  volunteer$: Volunteer;
  recipient$: Recipient;

  constructor(private loginService: LoginService, private recipientService: RecipientService) { }

  ngOnInit() {
    
    this.loginService.getLoggedInStatus().subscribe(data => this.volIsLoggedIn = data);
    console.log("Vol Logged In: ", this.volIsLoggedIn)
    this.recipientService.getLoggedInStatus().subscribe(data => this.recipIsLoggedIn = data);
    console.log("Recip Logged In: ", this.recipIsLoggedIn)
  
    this.loginService.getVolunteerByEmail(sessionStorage.getItem('username')).subscribe(data => this.volunteer$ = data);
    this.recipientService.getRecipientByEmail(sessionStorage.getItem('recipUsername')).subscribe(data => this.recipient$ = data);
  }

  ngOnDestroy(){


  }

  logout(){
    this.loginService.logout();
    this.recipientService.logout();
  }

}
