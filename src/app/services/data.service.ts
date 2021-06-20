import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

export interface Device {
  id:               string;
  new:              boolean;
  name:             string;
  rssi:             number;
  services?:        string[];
  advertising?:     any;
  characteristics?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public devices = new Map<string, Device>();
  public autoConnects: Device[] = [];
  private storage: Storage | null = null;

  constructor(
    private storageModule: Storage,
    private ble: BLE,
    private backgroundMode: BackgroundMode,
  ) {
    this.init();
  }

  async init() {
    document.addEventListener('deviceready', () => {
      this.backgroundMode.enable();
    }, false);
    const storage = await this.storageModule.create();
    this.storage = storage;
    const devices = await storage.get('devices');
    if (devices) {
      this.devices = devices;
    }
  }

  public getDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  public getDeviceById(id: string): Device {
    return this.devices.get(id);
  }

  public addDevice(device: Device) {
    if (device.advertising instanceof ArrayBuffer) {
      console.warn('Android sucks.');
    }
    device.new = true; // see clearDevices()
    this.devices.set(device.id, device);
    this.storage?.set('devices', this.devices);
  }

  public autoConnect(device: Device) {

    this.ble.autoConnect(
      device.id,
      (d: Device) => {
        // Do something !
        LocalNotifications.schedule({
          notifications: [
            {
              id: 1,
              title: 'BLEeper device spotted!',
              body: d.id
            }
          ]
        });
      },
      () => {
        console.log(`Disconnected: ${device.id}`);
      }
    );
  }

  public probe(device: Device) {
    this.ble.connect(device.id).subscribe(d => {
      this.addDevice(d);
      this.ble.disconnect(d.id);
    }, e => {
      console.error('Failed to connect to ' + device.id);
    });
  }

  public clearDevices() {
    // This will make rssi 0 for devices not seen in last scan
    this.devices.forEach(d => {
      if (!d.new) {
        d.rssi = 0;
      }
      d.new = false;
    });
  }

}
