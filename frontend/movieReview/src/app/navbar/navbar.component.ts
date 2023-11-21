import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
 islogin =""
constructor(private auth : AuthService)
{

}
 ngOnInit(): void {
  this.islogin = "login"
this.auth.getUser().subscribe((data:any)=>{
  this.islogin=data.email;
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: `welcome User ${this.islogin}`,
  })
},(err:any)=>{
  console.log(err)
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "unauthenticated User",
  })
})

 }
}
