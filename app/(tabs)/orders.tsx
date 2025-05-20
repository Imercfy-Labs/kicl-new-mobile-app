import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { ShoppingCart, ClipboardCheck, Truck as TruckDelivery } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();
  const windowHeight = Dimensions.get('window').height;
  
  return (
    <GradientBackground>
      <View style={[styles.container, { minHeight: windowHeight }]}>
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
    padding: 16,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: Platform.OS === 'web' ? 16 : 8,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#000',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: Platform.OS === 'web' ? 20 : 12,
  },
  actionCard: {
    flexDirection: Platform.OS === 'web' ? 'column' : 'row',
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: Platform.OS === 'web' ? 24 : 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'web' ? 16 : 0,
    marginRight: Platform.OS === 'web' ? 0 : 16,
  },
  actionTextContainer: {
    flex: Platform.OS === 'web' ? 0 : 1,
  },
  actionTitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});