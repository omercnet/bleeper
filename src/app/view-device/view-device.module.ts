import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewDevicePage } from './view-device.page';

import { IonicModule } from '@ionic/angular';

import { ViewDevicePageRoutingModule } from './view-device-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDevicePageRoutingModule
  ],
  declarations: [ViewDevicePage]
})
export class ViewDevicePageModule {}
