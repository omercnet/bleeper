/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="@capacitor/local-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.omer.bleeper',
  appName: 'BLEeper',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
  },
};

export default config;
