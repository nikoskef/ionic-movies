import { Observable, of } from 'rxjs';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

import { Component } from '@angular/core';
import { Platform, SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular';

import { ApiService } from '../services/api.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  trending$: Observable<any[]>;
  searchResults$: Observable<any[]>;

  searchActive = false;
  opts: SwiperOptions = {
    slidesPerView: Math.round(window.innerWidth / 232) + 0.4,
    spaceBetween: 10,
    slidesOffsetBefore: 10,
    navigation: this.platform.is('desktop')
    // pagination: {
    //   clickable: true,
    //    renderBullet: (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>'
    // }
  };

  constructor(private api: ApiService, private platform: Platform) {}

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
