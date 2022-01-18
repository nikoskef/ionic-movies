import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MoviePreviewComponent } from './movie-preview/movie-preview.component';

@NgModule({
  declarations: [MoviePreviewComponent],
  imports: [CommonModule, RouterModule],
  exports: [MoviePreviewComponent]
})
export class SharedComponentsModule {}
