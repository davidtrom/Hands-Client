import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Volunteer } from '../models/Volunteer';
import { Recipient } from '../models/Recipient';
import { RecipientService } from '../services/recipient.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userIsVolunteer: boolean = false;
  //userIsRecipient: boolean = false;
  currentVolunteer: Volunteer;
  currentRecipient: Recipient;

  constructor(private loginService: LoginService, private recipientService: RecipientService) { }

  ngOnInit() {
    this.loginService.getCurrentVolunteer().subscribe(volData => {this.currentVolunteer = volData;
      console.log(volData);
      if( volData != null){
      this.userIsVolunteer = true;
    }});

    console.log("userIsVolunteer: ", this.userIsVolunteer)

    this.recipientService.getCurrentRecipient().subscribe(recipData => this.currentRecipient = recipData);
    // console.log("userIsRecipient: ", this.userIsRecipient)
  }

}
