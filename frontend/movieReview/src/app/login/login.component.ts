import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  User = {
    email:"",
    password:""
  };
  constructor( private register:AuthService){}

  Login(){
    
    this.register.LoginUser(this.User).subscribe( data=>{
      alert(data)
    })
  }
}
