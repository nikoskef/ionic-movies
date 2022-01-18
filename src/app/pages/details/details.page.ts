import { map, Observable, switchMap, tap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  movie$: Observable<any>;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('id');
        const type = paramMap.get('type');
        return this.api.getMovieDetails(id, type);
      })
    );
  }
}
