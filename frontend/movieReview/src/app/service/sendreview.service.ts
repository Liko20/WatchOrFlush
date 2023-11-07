import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SendreviewService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json' });
  constructor(private  http : HttpClient) { }

  sendReview(id:number , review:any)
  {
     this.http.post("http://localhost:5000/review",JSON.stringify({id,review}),{headers:this.headers}).subscribe((data)=>{
        console.log(data);
     })
  }

  getReview(id:number)
  {
    return this.http.get(`http://localhost:5000/getreviews/${id}`,{headers:this.headers})
  }
}
