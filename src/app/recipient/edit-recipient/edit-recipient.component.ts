import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipient',
  templateUrl: './edit-recipient.component.html',
  styleUrls: ['./edit-recipient.component.css']
})
export class EditRecipientComponent implements OnInit {
  
  recipient$: any;

  constructor(private recipientService: RecipientService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.recipientService.getRecipient(id).subscribe(data => {this.recipient$ = data});
  }

}
