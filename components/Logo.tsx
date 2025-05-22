import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ showText = true, size = 'medium' }: LogoProps) {
  const logoSize = size === 'small' ? 40 : size === 'medium' ? 60 : 100;
  
  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        <Image 
          source={require('@/assets/images/icon.png')}
          style={[styles.logo, { width: logoSize * 0.8, height: logoSize * 0.8 }]}
          resizeMode="contain"
        />
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
          <Text style={styles.subtitle}>KICL FERTILIZERS</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    tintColor: '#2E3192',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E3192',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#2E3192',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});