import { Component } from '@angular/core';
import { GetmoviesService } from '../service/getmovies.service';
import { Movielist } from 'src/movieslist';

@Component({
  selector: 'app-tvseries',
  templateUrl: './tvseries.component.html',
  styleUrls: ['./tvseries.component.css']
})
export class TvseriesComponent {
  imagePath:string='https://image.tmdb.org/t/p/w500';
    list !:Movielist[];
    data:any;

    constructor(private getmovielist : GetmoviesService){
      this.getmovielist.getTvSeries()
      .subscribe( data  => {
        this.data=data;
        this.list=this.data.results
      });
}
}
