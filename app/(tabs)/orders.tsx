import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { ShoppingCart, ClipboardCheck, Truck as TruckDelivery } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();
  const windowHeight = Dimensions.get('window').height;
  const isWeb = Platform.OS === 'web';
  
  return (
    <GradientBackground>
      <View style={[styles.container, { height: windowHeight }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Orders</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/place')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(61, 211, 158, 0.1)' }]}>
              <ShoppingCart color="#3DD39E" size={24} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Place Order</Text>
              <Text style={styles.actionSubtitle}>Create a new order</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/my-orders')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(63, 81, 181, 0.1)' }]}>
              <ClipboardCheck color="#3F51B5" size={24} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>My Orders</Text>
              <Text style={styles.actionSubtitle}>View your orders</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/track')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 152, 0, 0.1)' }]}>
              <TruckDelivery color="#FF9800" size={24} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Track Order</Text>
              <Text style={styles.actionSubtitle}>Check order status</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'web' ? 24 : 16,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: Platform.OS === 'web' ? 24 : 16,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#000',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: Platform.OS === 'web' ? 24 : 16,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: Platform.OS === 'web' ? 24 : 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    transform: [{ scale: 1 }],
    transition: Platform.OS === 'web' ? 'transform 0.2s ease-in-out' : undefined,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  actionSubtitle: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#666',
  },
});