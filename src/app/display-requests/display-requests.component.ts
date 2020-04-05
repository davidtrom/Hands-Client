import { Component, OnInit } from '@angular/core';
import { HelpRequest } from '../models/helpRequest';
import { HelpRequestService } from '../services/help-request.service';

@Component({
  selector: 'app-display-requests',
  templateUrl: './display-requests.component.html',
  styleUrls: ['./display-requests.component.css']
})
export class DisplayRequestsComponent implements OnInit {

  helpRequests: any[];
  requestToClose: HelpRequest;

  constructor(private helpRequestService: HelpRequestService ) {
    
   }

  ngOnInit() {
    this.getHelpRequests();
  }

  getHelpRequests(){
    this.helpRequestService.getAllRequests().subscribe(data => {this.helpRequests = data});
    console.log(this.helpRequests);
  }

}
