import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { Recipient } from 'src/app/models/Recipient';
import { RequestorLoginService } from 'src/app/services/requestor-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  userIsVolunteer: boolean;
  userIsRecipient: boolean;
  currentVolunteer: Volunteer;
  currentRecipient: Recipient;

  constructor(private loginService: LoginService, private requestorLoginService: RequestorLoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(data => this.isLoggedIn = data);
    
    // this.loginService.currentVolunteer$.subscribe(data => {this.currentVolunteer = data;
    //   if(!data == null){
    //     this.userIsRecipient=false;
    //     this.userIsVolunteer=true;
    //     console.log("recipient: ", this.userIsRecipient);
    //     console.log("volunteer: ", this.userIsVolunteer);
    //   }
    // });
    
    // this.requestorLoginService.currentRecipient$.subscribe(data => {this.currentRecipient = data;
    //   if(!data == null){
    //     this.userIsRecipient=true;
    //     this.userIsVolunteer=false;
    //   }
    // });
  }

  logout(){
    this.loginService.updateLoggedInStatus(false);
    if(!this.currentVolunteer==null){
      this.loginService.updateCurrentVolunteer(null);
    }
    else {
    this.requestorLoginService.updateCurrentRecipient(null);
    }
  }

}
