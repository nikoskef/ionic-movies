import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule, SharedPipesModule],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
