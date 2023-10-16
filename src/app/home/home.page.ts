import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides, Platform, SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperOptions } from 'swiper/types';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  trending$: Observable<any[]>;
  searchResults$: Observable<any[]>;
  public swiperModules = [IonicSlides];

  @ViewChild('swiper', { static: false }) swiper?: ElementRef<{ swiper: Swiper }>;

  swiperParams: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 3.5,
    spaceBetween: 50,
    navigation: true,

    breakpoints: {
      320: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3.5,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4.5,
        spaceBetween: 40
      }
    }
  };

  searchActive = false;
  // opts: SwiperOptions = {
  //   slidesPerView: Math.round(window.innerWidth / 232) + 0.4,
  //   spaceBetween: 10,
  //   slidesOffsetBefore: 10,
  //   navigation: this.platform.is('desktop')
  //   // pagination: {
  //   //   clickable: true,
  //   //    renderBullet: (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>'
  //   // }
  // };

  constructor(private api: ApiService, private platform: Platform) {}

  ngAfterViewInit() {
    if (this.swiper?.nativeElement) {
      Object.assign(this.swiper?.nativeElement, this.swiperParams);
    }
  }

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
