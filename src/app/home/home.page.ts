import { Component } from '@angular/core';
import { DataService, Device } from '../services/data.service';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private data: DataService,
    private ble: BLE,
  ) {
    this.ble.enable()
    .then(() => console.log('BLE Enabled!'))
    .catch((e) => console.error(`Failed BLE - ${e}`));
  }

  refresh(ev) {
    this.ble.startScan(
      []
    ).subscribe((device) => {
      if (device.rssi > -90) {
        this.data.addDevice(device);
      }
    });
    setTimeout(() => {
      this.ble.stopScan();
      this.data.clearDevices();
      if (ev) {
        ev.detail.complete();
      }
    }, 3000);

  }

  getDevices(): Device[] {
    return this.data.getDevices().sort((a, b) => {
      if (!a.rssi) { return 1;}
      if (!b.rssi) { return -1;}
      return b.rssi - a.rssi;
    });
  }
}
