import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  trending$: Observable<any[]>;
  opts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    slidesOffsetBefore: 10
  };

  constructor(private api: ApiService) {}

  ionViewWillEnter(): void {
    this.loadTrending();
  }

  loadTrending() {
    this.trending$ = this.api.getTrending();
  }
}
