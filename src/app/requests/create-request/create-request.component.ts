import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  newRequestForm: FormGroup;
  descriptionLength$: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newRequestForm = this.fb.group({
      typeOfRequest: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.newRequestForm.get('description').valueChanges.subscribe(value => this.descriptionLength$ = value);
  }

  get form() { return this.newRequestForm.controls; }
}
