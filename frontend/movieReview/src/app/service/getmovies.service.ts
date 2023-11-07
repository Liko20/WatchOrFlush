import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movielist } from 'src/movieslist';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetmoviesService {
  headers= new HttpHeaders().set('Authorization','Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTcyMWY1NWRiMzIxMzdhNTk4OGZmMGMzNzA4MzJhYyIsInN1YiI6IjYzY2Y4MTZiY2Y5YmEzMDBiMWRmMTc3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yzBQZfXC4Yaxi92Lcl0YsCGmNRPFWS47naMXgtAQoAU' )
  options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTcyMWY1NWRiMzIxMzdhNTk4OGZmMGMzNzA4MzJhYyIsInN1YiI6IjYzY2Y4MTZiY2Y5YmEzMDBiMWRmMTc3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yzBQZfXC4Yaxi92Lcl0YsCGmNRPFWS47naMXgtAQoAU'
    }
  }
  api_key='21721f55db32137a5988ff0c370832ac';
  movieurl="https://api.themoviedb.org/3/trending/movie/day?api_key=";
  tvurl='https://api.themoviedb.org/3/trending/tv/day?api_key=';
  tvByIdUrl!:string;
  movieByIdUrl!:string;
  byId='https://api.themoviedb.org/3/find/external_id?external_source=';
  search ="";
  
  constructor(private http:HttpClient) { }

  getMovieList(){
        return this.http.get(`${this.movieurl}${this.api_key}`,{headers:this.headers});
  }

  getTvSeries(){
    return this.http.get(`${this.tvurl}${this.api_key}`,{headers:this.headers});
  }
  getMovieById(id:number){
    this.movieByIdUrl=`https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}`;
    return this.http.get(this.movieByIdUrl,{headers:this.headers});
  }
  getTvById(id:number){
    this.tvByIdUrl=`https://api.themoviedb.org/3/tv/${id}?api_key=${this.api_key}`;
    return this.http.get(this.tvByIdUrl,{headers:this.headers});
  }

  searchMovie()
  {
    
  }

 

  
  
}
