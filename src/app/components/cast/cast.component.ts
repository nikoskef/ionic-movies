import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cast',
    templateUrl: './cast.component.html',
    styleUrls: ['./cast.component.scss'],
    standalone: true,
    imports: [IonicModule, RouterLink]
})
export class CastComponent implements OnInit {
  @Input() actor: any;
  imageUrl = '';

  constructor() {}

  ngOnInit() {
    this.imageUrl = `${environment.images}/w400/${this.actor.profile_path}`;
  }
}
