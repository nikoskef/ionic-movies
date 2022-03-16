import { SwiperModule } from 'swiper/angular';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '../components/shared-components.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedComponentsModule, SwiperModule],
  declarations: [HomePage]
})
export class HomePageModule {}
