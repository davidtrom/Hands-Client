import { Component, OnInit, Input } from '@angular/core';
import { HelpRequest } from '../../models/helpRequest';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HelpRequestService } from '../../services/help-request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request$: any;

  constructor(private route: ActivatedRoute, private router: Router,  private helpRequestService: HelpRequestService){

   }

  @Input() helpRequest: HelpRequest;

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);

   this.helpRequestService.getRequest(id).subscribe(data => {this.request$ = data});
    console.log(this.request$);
  }

}
