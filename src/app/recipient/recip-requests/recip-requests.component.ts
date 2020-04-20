import { Component, OnInit } from '@angular/core';
import { HelpRequestService } from 'src/app/services/help-request.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { HelpRequest } from 'src/app/models/helpRequest';
import { Recipient } from 'src/app/models/Recipient';

@Component({
  selector: 'app-recip-requests',
  templateUrl: './recip-requests.component.html',
  styleUrls: ['./recip-requests.component.css']
})
export class RecipRequestsComponent implements OnInit {

  helpRequests: HelpRequest[];
  currentRecipient$: Recipient;

  constructor(private recipientService: RecipientService) { }

  ngOnInit() {
    this.recipientService.getCurrentRecipient().subscribe(data => this.currentRecipient$ = data);
    let recipientId = this.currentRecipient$.id;
    this.recipientService.getThisRecipientRequests(recipientId).subscribe(data => this.helpRequests = data);
  }

  // ngOnDestroy(){
  //   this.helpRequests.unsubscribe();

  // }

}
