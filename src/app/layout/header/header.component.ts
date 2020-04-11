import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { Recipient } from 'src/app/models/Recipient';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  currentVolunteer: Volunteer;
  currentRecipient: Recipient;


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(data => this.isLoggedIn = data);
    this.loginService.currentVolunteer$.subscribe(data => this.currentVolunteer = data);
    this.loginService.currentRecipient$.subscribe(data => this.currentRecipient = data);
  }

  logout(){
    this.loginService.updateLoggedInStatus(false);
    this.loginService.updateCurrentVolunteer(null);
    this.loginService.updateCurrentRecipient(null);
  }

}
