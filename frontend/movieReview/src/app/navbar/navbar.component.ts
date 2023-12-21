import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LogoutService } from '../service/logout.service';
import { Emitters } from '../emitters/emitters';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
 islogin =false
 user=""
constructor(private auth : AuthService,private logout:LogoutService,private router:Router)
{
  this.auth.getUser().subscribe((data:any)=>{
    this.islogin = true
    this.user=data.email;
    Emitters.authEmitter.emit(true)
    Emitters.CurrentUser.emit(this.user)
    localStorage.setItem("username",this.user)
  },(err:any)=>{
    this.islogin = false
    this.user=""
    Emitters.authEmitter.emit(false)
    Emitters.CurrentUser.emit("")
    localStorage.removeItem("username")
  })
  
}
 ngOnInit(): void {
  Emitters.authEmitter.subscribe((auth:boolean)=>{
    this.islogin=auth
  })

  Emitters.CurrentUser.subscribe((curruser=>{
    this.user=curruser;
  }))

 }

 logoutreq(){
    this.logout.logout().subscribe(data=>{
      this.router.navigate(["/"])
      Emitters.authEmitter.emit(false)
      Emitters.CurrentUser.emit("")
      localStorage.removeItem("username")
    },(err)=>{
      console.log(err)
    });
 }

 
}

