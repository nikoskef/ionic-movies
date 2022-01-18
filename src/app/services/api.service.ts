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
    return this.http.get<GetMoviesApi>(`${environment.api}/trending/all/day`).pipe(map((res) => res.results));
  }
}
