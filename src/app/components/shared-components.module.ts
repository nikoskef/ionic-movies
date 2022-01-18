import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoviePreviewComponent } from './movie-preview/movie-preview.component';

@NgModule({
  declarations: [MoviePreviewComponent],
  imports: [CommonModule],
  exports: [MoviePreviewComponent]
})
export class SharedComponentsModule {}
