import { Component, OnInit } from '@angular/core';
import { HelpRequestService } from 'src/app/services/help-request.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { Recipient } from 'src/app/models/Recipient';
import { HelpRequest } from 'src/app/models/helpRequest';

@Component({
  selector: 'app-requestor-dashboard',
  templateUrl: './requestor-dashboard.component.html',
  styleUrls: ['./requestor-dashboard.component.css']
})
export class RequestorDashboardComponent implements OnInit {
  
  recipient$: Recipient;
  helpRequests$: HelpRequest[];

  constructor(private helpRequestService: HelpRequestService, private recipientService: RecipientService) { }

  ngOnInit() {
    this.recipientService.getCurrentRecipient().subscribe(data => this.recipient$ = data);

    this.recipientService.getThisRecipientRequests(this.recipient$.id).subscribe(data => this.helpRequests$ = data);
  

  }

}
