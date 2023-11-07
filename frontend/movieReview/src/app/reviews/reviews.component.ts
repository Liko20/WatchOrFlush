import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetmoviesService } from '../service/getmovies.service';
import { SendreviewService } from '../service/sendreview.service';
import { Movielist } from 'src/movieslist';
import { FormControl ,FormGroup} from "@angular/forms";
import { JSDocComment } from '@angular/compiler';

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
  reviewObj!:any;
  allReviews!:any;
  ReviewForm = new FormGroup({
    reviewStr : new FormControl("")
  })

    constructor(private activatedRoute : ActivatedRoute,private getmovies:GetmoviesService,private sendreview: SendreviewService){
      this.media = this.activatedRoute.snapshot.params['media_type'] ;
      this.id = this.activatedRoute.snapshot.params['id'] ;
      console.log(this.media)
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
      this.sendreview.sendReview(this.id, this.ReviewForm.value.reviewStr );
      this.ReviewForm.reset() ;
    }

    ngOnInit(){
      
    }
}
