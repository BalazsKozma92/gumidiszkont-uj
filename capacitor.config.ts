import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hu.gumidiszkont.app',
  appName: 'Gumidiszkont Miskolc',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
