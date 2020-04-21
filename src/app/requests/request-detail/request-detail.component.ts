import { Component, OnInit, Input } from '@angular/core';
import { HelpRequest } from '../../models/helpRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpRequestService } from '../../services/help-request.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { Recipient } from 'src/app/models/Recipient';
import { LoginService } from 'src/app/services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request$: any;
  volunteer$: Volunteer;
  recipient$: Recipient;
  emailSent: boolean;
  statusOpen: boolean = false;
  userIsVolunteer: boolean;
  userIsRecipient: boolean;

  constructor(private route: ActivatedRoute, private helpRequestService: HelpRequestService, private recipientService: RecipientService, private loginService: LoginService, private router: Router){

   }

  @Input() helpRequest: HelpRequest;

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.helpRequestService.getRequest(id).subscribe(data => {this.request$ = data;
      if(this.request$.requestStatus == "OPEN"){
        this.statusOpen = true;
      }
    });

    this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    
    this.loginService.getLoggedInStatus
    // this.loginService.getCurrentVolunteer().subscribe(data => {this.volunteer$ = data;
    //   if(this.volunteer$ !== null){
    //     this.userIsVolunteer = true;
    //   }
    //   else{
    //     this.recipientService.getCurrentRecipient().subscribe(data => {this.recipient$ = data;
    //       if(this.recipient$ !== null){
    //         this.userIsRecipient = true;
    //       }});
    //   }
    // });
  }

  changeStatus(id:number){
    console.log(this.volunteer$);
    this.helpRequestService.changeRequestStatus(id, sessionStorage.getItem('username')).subscribe(data => {console.log("update request status; emailing requestor...")});
    location.reload();
  }

  // getSessionStoredVolunteer(){
  //   this.loginService.getVolunteerByEmail(this.loginService.getSessionStorageVolunteer()).subscribe(data => {this.volunteer$ = data;
  //     // if(this.volunteer$ != null){
  //     //   this.loginService.updateLoggedInStatus(true);
  //     //   this.loginService.updateCurrentVolunteer(data);
  //     // }
  //   });

  // }

  //view all requests
  //view my requests button 
  //if not a volunteer then view all requests button doesn't appear

}
