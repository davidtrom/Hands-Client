import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';
import { HelpRequest } from 'src/app/models/helpRequest';
import { ActivatedRoute } from '@angular/router';
import { HelpRequestService } from 'src/app/services/help-request.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-vol-requests',
  templateUrl: './vol-requests.component.html',
  styleUrls: ['./vol-requests.component.css']
})
export class VolRequestsComponent implements OnInit {
  
  volunteer$: Volunteer;
  helpRequests: HelpRequest[];

  constructor(private helpRequestService: HelpRequestService, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.loginService.getThisVolunteerRequests(id).subscribe(data => {console.log("Fetching requests");
      this.helpRequests = data;})
  }

  freeRequest(id: number){
    this.helpRequestService.freeRequest(id);
    location.reload;
  }
}
