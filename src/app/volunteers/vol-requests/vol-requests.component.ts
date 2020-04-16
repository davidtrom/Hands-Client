import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { HelpRequest } from 'src/app/models/helpRequest';

@Component({
  selector: 'app-vol-requests',
  templateUrl: './vol-requests.component.html',
  styleUrls: ['./vol-requests.component.css']
})
export class VolRequestsComponent implements OnInit {
  
  volunteer$: Volunteer;
  helpRequests: HelpRequest[];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.currentVolunteer$.subscribe(data => this.volunteer$ = data);

    this.helpRequests=this.volunteer$.helpRequests;
  }

}
