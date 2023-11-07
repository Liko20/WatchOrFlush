import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

const token = localStorage.getItem('token')

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService {

  constructor() { }
  
  intercept( req:any , next:any){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${token}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
