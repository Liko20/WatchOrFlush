import { Component, Input } from '@angular/core';
import { Movielist } from 'src/movieslist';
import { GetmoviesService } from '../service/getmovies.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
    
    imagePath:string='https://image.tmdb.org/t/p/w500';
    list !:Movielist[];
    data:any;

    constructor(private getmovielist : GetmoviesService){
      this.getmovielist.getMovieList()
      .subscribe( data  => {
        this.data=data;
        this.list=this.data.results
      });
    }
    
   
}
