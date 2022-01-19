import { Observable, of } from 'rxjs';

import { Component } from '@angular/core';
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  trending$: Observable<any[]>;
  searchResults$: Observable<any[]>;

  searchActive = false;
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

  searchChanged(event: Event) {
    const search = (event as SearchbarCustomEvent).detail.value;
    if (search !== '') {
      this.searchActive = true;
      this.searchResults$ = this.api.getSearchResults(search);
    } else {
      this.searchActive = false;
      this.searchResults$ = of([]);
    }
  }
}
