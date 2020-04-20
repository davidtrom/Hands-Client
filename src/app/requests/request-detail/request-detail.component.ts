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
  recipient: Recipient;
  emailSent: boolean;
  statusOpen: boolean = false;

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

    this.loginService.getVolunteerByEmail(this.loginService.getSessionStorageVolunteer()).subscribe(data => {this.volunteer$ = data;
      // if(this.volunteer$ != null){
      //   this.loginService.updateLoggedInStatus(true);
      //   this.loginService.updateCurrentVolunteer(data);
      // }
    });

  }

  changeStatus(id:number){
    console.log(this.volunteer$);
    this.helpRequestService.changeRequestStatus(id, this.volunteer$.email).subscribe(data => {console.log("update request status; emailing requestor...")});
    location.reload();
}

  reRouteBack() {
    if(this.volunteer$ == null){
      this.router.navigate(['/req-dashboard']);
    }
    //else if ()
  }

  //view all requests
  //view my requests button 
  //if not a volunteer then view all requests button doesn't appear

}
