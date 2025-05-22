export default {
  name: 'KICL Mobile App',
  slug: 'kicl-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
  userInterfaceStyle: 'light',
  splash: {
    image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
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
      foregroundImage: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.kicl.mobile'
  },
  web: {
    favicon: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    bundler: 'metro'
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://devkicl.duckdns.org/api'
  },
  plugins: []
};