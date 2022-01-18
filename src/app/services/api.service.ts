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

  getActorDetails(id: string) {
    return this.http
      .get<any>(`${environment.api}/person/${id}`)
      .pipe(map((res) => ({ ...res, profileImg: `${environment.images}/w200/${res.profile_path}` || null })));
  }

  getActorCreditList(id: string) {
    return this.http.get<{ cast: any[] }>(`${environment.api}/person/${id}/combined_credits`).pipe(
      map((res) => res.cast),
      map((cast) =>
        cast.sort((a, b) => {
          const aValue = a.release_date || a.first_air_date;
          const bValue = b.release_date || b.first_air_date;
          if (!aValue) {
            return 1;
          }
          if (!bValue) {
            return -1;
          }

          const aDate = new Date(aValue);
          const bDate = new Date(bValue);
          return bDate.getTime() - aDate.getTime();
        })
      ),
      map((cast) =>
        cast.map((entry) => {
          const value = entry.release_date || entry.first_air_date;
          Object.assign(entry, { customYear: value ? new Date(value).getFullYear() : null });
          return entry;
        })
      )
    );
  }
}
