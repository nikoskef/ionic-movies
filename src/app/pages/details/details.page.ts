import Vibrant from 'node-vibrant';
import { Observable, switchMap, tap } from 'rxjs';

import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  movie$: Observable<any>;
  mainColor = '#fff';
  textColor = '#000';
  cast$: Observable<any[]>;

  opts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    slidesOffsetBefore: 10
  };

  constructor(private api: ApiService, private route: ActivatedRoute, private elementRef: ElementRef) {}

  ngOnInit() {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('id');
        const type = paramMap.get('type');
        this.cast$ = this.api.getMovieCast(id, type);
        return this.api.getMovieDetails(id, type);
      }),
      tap((movie) => {
        if (movie.imageUrl) {
          this.getDominantColor(movie.imageUrl);
        }
      })
    );
  }

  getDominantColor(url: string) {
    Vibrant.from(url.replace('/w92/', '/w400/')).getPalette((_, palette) => {
      this.mainColor = palette.Vibrant.getHex();
      this.textColor = palette.Vibrant.getTitleTextColor();
      this.elementRef.nativeElement.style.setProperty('--main', this.mainColor);

      const mainDark = this.lightenDarken(this.mainColor, -40);
      this.elementRef.nativeElement.style.setProperty('--maindark', mainDark);
    });
  }

  lightenDarken(col: string, amt: number) {
    col = col.replace(/^#/, '');
    if (col.length === 3) {
      col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
    }

    const [r, g, b] = col.match(/.{2}/g);
    const [rr, gg, bb] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt];

    const rrr = Math.max(Math.min(255, rr), 0).toString(16);
    const ggg = Math.max(Math.min(255, gg), 0).toString(16);
    const bbb = Math.max(Math.min(255, bb), 0).toString(16);

    const rrrr = (rrr.length < 2 ? '0' : '') + rr;
    const gggg = (ggg.length < 2 ? '0' : '') + gg;
    const bbbb = (bbb.length < 2 ? '0' : '') + bb;

    return `#${rrrr}${gggg}${bbbb}`;
  }
}
