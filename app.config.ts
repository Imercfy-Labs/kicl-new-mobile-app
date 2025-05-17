export default {
  name: 'KICL Mobile App',
  slug: 'kicl-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kicl.mobile'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.kicl.mobile'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL
  },
  plugins: []
};