import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  checkLogin(){
    if(!this.loginService.volunteer == null){
      
    }
  }

  logout(){
    this.loginService.isLoggedIn=false;
  }

}
