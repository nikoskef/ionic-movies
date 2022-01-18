import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CastComponent } from './cast/cast.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';

@NgModule({
  declarations: [MoviePreviewComponent, CastComponent],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MoviePreviewComponent, CastComponent]
})
export class SharedComponentsModule {}
