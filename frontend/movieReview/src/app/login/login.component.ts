import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LogoutService } from '../service/logout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

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
  constructor( private auth:AuthService , private router:Router){}

  Login(){
    this.auth.LoginUser(this.User).subscribe( data=>{
      Emitters.authEmitter.emit(true)
      localStorage.setItem("username",data.username)
      this.router.navigate([""]);
    },(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter valid Password or Email',
      })
      localStorage.removeItem("username")
      Emitters.authEmitter.emit(false)
    })
  }
}
