export default {
  name: 'KICL Mobile App',
  slug: 'kicl-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/kicl-logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/kicl-logo.png',
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
      foregroundImage: './assets/images/kicl-logo.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.kicl.mobile'
  },
  web: {
    favicon: './assets/images/kicl-logo.png',
    bundler: 'metro'
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://devkicl.duckdns.org/api'
  },
  plugins: []
};