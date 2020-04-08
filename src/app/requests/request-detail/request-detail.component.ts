import { Component, OnInit, Input } from '@angular/core';
import { HelpRequest } from '../../models/helpRequest';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HelpRequestService } from '../../services/help-request.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { Recipient } from 'src/app/models/Recipient';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request$: any;
  recipient: Recipient;

  constructor(private route: ActivatedRoute, private router: Router,  private helpRequestService: HelpRequestService, private recipientService: RecipientService){

   }

  @Input() helpRequest: HelpRequest;

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);

   this.helpRequestService.getRequest(id).subscribe(data => {this.request$ = data});
  
   this.recipientService.getRecipient(this.request$.recipient).subscribe(data => {this.recipient = data});

  }

}
