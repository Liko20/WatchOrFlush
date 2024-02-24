import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetmoviesService } from '../service/getmovies.service';
import { SendreviewService } from '../service/sendreview.service';
import { Movielist } from 'src/movieslist';
import { FormControl ,FormGroup} from "@angular/forms";
import { JSDocComment } from '@angular/compiler';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  id!:number;
  media!:string;
  movielist:any;
  movie!:Movielist;
  var:any;
  user!:any;
  userloggedin!:boolean;
  reviewObj!:any;
  allReviews!:any;
  ReviewForm = new FormGroup({
    reviewStr : new FormControl("")
  })

    constructor(private activatedRoute : ActivatedRoute,private getmovies:GetmoviesService,private sendreview: SendreviewService,private router:Router){
      this.media = this.activatedRoute.snapshot.params['media_type'] ;
      this.id = this.activatedRoute.snapshot.params['id'] ;
      
      if(this.media=="movie"){
          this.getmovies.getMovieById(this.id).subscribe(data=>{
            this.movielist=data;
            this.movie=this.movielist;
          })
      }
      else{
        this.getmovies.getTvById(this.id).subscribe(data=>{
          this.movielist=data;
          this.movie=this.movielist;
        })
      }

      this.sendreview.getReview(this.id).subscribe(data=>{
        this.allReviews=data;
        console.log(data)
      })

    }

    send()
    {
      this.sendreview.sendReview(this.id, this.ReviewForm.value.reviewStr,this.user );
      this.ReviewForm.reset() ;

    }
    sendTologinPage()
    {
      this.router.navigate(['/login']);
    }

    ngOnInit(){
      this.user=localStorage.getItem("username");
      if(this.user != null){
        console.log("true")
        this.userloggedin=true;
      }
      else{
        this.userloggedin=false;
      }
      
    }
}
