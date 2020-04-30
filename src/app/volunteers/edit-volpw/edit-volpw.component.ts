import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-volpw',
  templateUrl: './edit-volpw.component.html',
  styleUrls: ['./edit-volpw.component.css']
})
export class EditVolpwComponent implements OnInit {

  editVolunteerPWForm: FormGroup;
  editVolunteerEmailForm: FormGroup;
  volunteer$: Volunteer;
  passwordsMatch: boolean;
  emailAvailable: boolean;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    // let id = +this.route.snapshot.paramMap.get('id');
    // console.log(id);
    // this.loginService.getVolunteerById(id).subscribe(idData => {console.log("getting vol");});
    this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    console.log(this.volunteer$);
    // this.editVolunteerPWForm = this.fb.group({
    //   currentPassword: ['', [Validators.required]],
    //   newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
    //   confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    // });

    


  }

  // get volPWForm() { return this.editVolunteerPWForm.controls; }

  

  onSubmit(){
    

  }

  
  // updatePassword(this.editVolunteerPWForm.controls.currentPassword.value){

  // }
}
