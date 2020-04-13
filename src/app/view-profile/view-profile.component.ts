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

  userIsVolunteer: boolean = false;
  userIsRecipient: boolean = false;
  currentVolunteer: Volunteer;
  currentRecipient: Recipient;

  constructor(private loginService: LoginService, private requestorLoginService: RequestorLoginService) { }

  ngOnInit() {
    this.loginService.currentVolunteer$.subscribe(volData => this.currentVolunteer = volData);
    console.log("userIsVolunteer: ", this.userIsVolunteer)

    this.requestorLoginService.currentRecipient$.subscribe(recipData => this.currentRecipient = recipData);
  }

  editVolunteer(id:number){

  }

  editRecipient(id:number){
    

  }

  
}
