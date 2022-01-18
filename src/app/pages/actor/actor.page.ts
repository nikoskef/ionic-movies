import { map, Observable, switchMap, tap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.page.html',
  styleUrls: ['./actor.page.scss']
})
export class ActorPage implements OnInit {
  actorBio$: Observable<any>;
  actorCreditList$: Observable<any>;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.actorBio$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id) => {
        this.actorCreditList$ = this.api.getActorCreditList(id);
        return this.api.getActorDetails(id);
      })
    );
  }
}
