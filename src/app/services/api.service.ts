import { map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

interface GetMoviesApi {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http.get<GetMoviesApi>(`${environment.api}/trending/all/day`).pipe(
      map((res) => res.results),
      map((results) => results.sort((a, b) => b.popularity - a.popularity))
    );
  }

  getMovieDetails(id: string, type: string) {
    return this.http.get<any>(`${environment.api}/${type}/${id}`).pipe(
      map((movie) => ({
        ...movie,
        background: movie.backdrop_path ? `${environment.images}/w400/${movie.backdrop_path}` : null,
        imageUrl: movie.poster_path ? `${environment.images}/w92/${movie.poster_path}` : null
      }))
    );
  }

  getMovieCast(id: string, type: string) {
    return this.http.get<{ cast: any[] }>(`${environment.api}/${type}/${id}/credits`).pipe(map((res) => res.cast));
  }
}
