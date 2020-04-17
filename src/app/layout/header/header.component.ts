import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { Recipient } from 'src/app/models/Recipient';
import { RequestorLoginService } from 'src/app/services/requestor-login.service';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  volIsLoggedIn: boolean;
  recipIsLoggedIn: boolean;

  constructor(private loginService: LoginService, private recipientService: RecipientService) { }

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(data => this.volIsLoggedIn = data);
    this.recipientService.isLoggedIn$.subscribe(data => this.recipIsLoggedIn = data);
  }

  ngOnDestroy(){

  }

  logout(){
    this.loginService.updateLoggedInStatus(false);
    this.recipientService.updateLoggedInStatus(false);
    // if(this.currentVolunteer != null){
    //   this.loginService.updateCurrentVolunteer(null);
    // }
    // else {
    // this.recipientService.updateCurrentRecipient(null);
    // }
  }

}
