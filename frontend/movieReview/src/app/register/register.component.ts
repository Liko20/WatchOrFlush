import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  User = {
    email:"",
    password:""
  };

  constructor( private register:AuthService , private router:Router){}

  sendInfo(){
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    if(this.User.email === "" ||  this.User.password === "")
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill all the Fields!',
      })
    }
    else if(!expression.test(this.User.email))
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter valid Email!',
      })
    }
    else{
      this.register.registerUser(this.User).subscribe( ()=>{
        this.router.navigate(['/']);
        Emitters.authEmitter.emit(true)
      }, err=>{
          Swal.fire("Error",err.error.message,"error")
          Emitters.authEmitter.emit(false)
      });
      
    }
    
  }


  ngOnInit():void
  {
    this.User.email=""
    this.User.password=""
  }

  
  
}
