import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-movie-preview',
    templateUrl: './movie-preview.component.html',
    styleUrls: ['./movie-preview.component.scss'],
    standalone: true,
    imports: [RouterLink, IonicModule, DecimalPipe, DatePipe]
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: any;
  imageUrl = '';

  constructor() {}

  ngOnInit() {
    this.imageUrl = `${environment.images}/w200/${this.movie.poster_path}`;
  }
}
