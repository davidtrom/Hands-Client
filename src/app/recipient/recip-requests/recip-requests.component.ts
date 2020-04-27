import { Component, OnInit } from '@angular/core';
import { HelpRequestService } from 'src/app/services/help-request.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { HelpRequest } from 'src/app/models/helpRequest';
import { Recipient } from 'src/app/models/Recipient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recip-requests',
  templateUrl: './recip-requests.component.html',
  styleUrls: ['./recip-requests.component.css']
})
export class RecipRequestsComponent implements OnInit {

  helpRequests: HelpRequest[];
  currentRecipient$: Recipient;
  noHelpRequests: boolean;

  constructor(private route: ActivatedRoute, private helpRequestService: HelpRequestService, private recipientService: RecipientService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    // console.log(sessionStorage.getItem('recipUsername'));
    // this.recipientService.getRecipientByEmail(sessionStorage.getItem('recipUsername')).subscribe(data => this.currentRecipient$ = data);
    // console.log(this.currentRecipient$);
    
    this.recipientService.getRecipientById(id).subscribe(data => this.currentRecipient$ = data);
    
    this.recipientService.getThisRecipientRequests(id).subscribe(data => {this.helpRequests = data;
    if(this.helpRequests.length === 0){
        this.noHelpRequests = true;
    }
    else {
      this.noHelpRequests = false;
    }});

  }

  // ngOnDestroy(){
  //   this.recipientService.getRecipientById(id).unsubscribe();

  // }

}
