import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  newRequestForm: FormGroup;
  descriptionLength = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newRequestForm = this.fb.group({
      typeOfRequest: ['', [Validators.required]],
      description: ['']
    });

    this.newRequestForm.get('description').valueChanges.subscribe((value: string) => {
      this.descriptionLength = value.length;
      console.log(this.descriptionLength);
     }
      );
  }

 get typeOfRequest(){
   return this.newRequestForm.get('typeOfRequest');
 }

 get description(){
   return this.newRequestForm.get('description');
 }
 
  // get form() { return this.newRequestForm.controls; }
}

//, [Validators.required]