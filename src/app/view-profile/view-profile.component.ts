import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RequestorLoginService } from '../requestor-login.service';
import { Volunteer } from '../models/Volunteer';
import { Recipient } from '../models/Recipient';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userIsVolunteer: boolean;
  userIsRecipient: boolean;
  currentVolunteer: Volunteer;
  currentRecipient: Recipient;

  constructor(private loginService: LoginService, private requestorLoginService: RequestorLoginService) { }

  ngOnInit() {
    this.loginService.currentVolunteer$.subscribe(data => {this.currentVolunteer = data;
      if(!data == null){
        this.userIsRecipient=false;
        this.userIsVolunteer=true;
      }
    });

    this.requestorLoginService.currentRecipient$.subscribe(data => {this.currentRecipient = data;
      if(!data == null){
        this.userIsRecipient=true;
        this.userIsVolunteer=false;
      }
    });
  
  }

  
}
