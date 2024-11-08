import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'examen.ii',
  appName: 'examen-ii',
  webDir: 'dist',
  plugins: {
    Camera: {
      saveToGallery: true,
      allowEditing: true
    }
  }
};

export default config;
