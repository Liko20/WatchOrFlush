import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http : HttpClient) { }

  logout()
  {
    return this.http.post("http://localhost:5000/logout" , {},{withCredentials:true});
  }

}
