import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Recipient } from 'src/app/models/Recipient';

@Component({
  selector: 'app-edit-recipient',
  templateUrl: './edit-recipient.component.html',
  styleUrls: ['./edit-recipient.component.css']
})
export class EditRecipientComponent implements OnInit {

  
  recipient$: Recipient;
  editRecipientForm: FormGroup;

  constructor(private recipientService: RecipientService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.recipientService.getCurrentRecipient().subscribe(data => {this.recipient$ = data});
    
    this.editRecipientForm = this.fb.group({
      firstName: [this.recipient$.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [this.recipient$.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: [this.recipient$.phoneNum, [Validators.required, Validators.minLength(10)]],
      email: [this.recipient$.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      location: [this.recipient$.location, [Validators.required]],
      link: [this.recipient$.link]
    });

    // let id = +this.route.snapshot.paramMap.get('id');

    // this.recipientService.getRecipient(id).subscribe(data => {this.recipient$ = data});
  }

  get form() {return this.editRecipientForm.controls;}



}
