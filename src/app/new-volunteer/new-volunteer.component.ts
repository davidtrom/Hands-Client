import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  volunteerForm: FormGroup;
  
  constructor() { }

  ngOnInit() {
    this.volunteerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNum: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      link: new FormControl(),
    })

  //   this.volunteerForm = this.fb.group({
  //     firstName: [''],
  //     lastName: [''],
  //     phoneNum: [''],
  //     email: [''],
  //     password: [''],
  //     link: ['']
  //   });
  }

}
