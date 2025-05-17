import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Button from '@/components/Button';
import { Search, Plus, Minus, X } from 'lucide-react-native';

// Mock data for products
const PRODUCTS = [
  {
    id: '1',
    name: 'Super Grow Fertilizer',
    price: 750,
    unit: 'bag',
    available: 240,
  },
  {
    id: '2',
    name: 'Premium Seeds Mix',
    price: 320,
    unit: 'packet',
    available: 120,
  },
  {
    id: '3',
    name: 'Pest Control Solution',
    price: 480,
    unit: 'bottle',
    available: 85,
  },
  {
    id: '4',
    name: 'Garden Tools Set',
    price: 1200,
    unit: 'set',
    available: 45,
  },
  {
    id: '5',
    name: 'Soil Enhancer',
    price: 550,
    unit: 'bag',
    available: 180,
  },
];

// Mock data for dealers
const DEALERS = [
  { id: '1', name: 'Agro Solutions Ltd.' },
  { id: '2', name: 'Krishi Kendra' },
  { id: '3', name: 'Farm Supplies Co.' },
  { id: '4', name: 'Seedtech Enterprises' },
  { id: '5', name: 'Green Growth Agro' },
];

export default function PlaceOrderScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [showDealerDropdown, setShowDealerDropdown] = useState(false);
  const [cart, setCart] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const router = useRouter();
  
  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDealers = DEALERS.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const product = PRODUCTS.find(p => p.id === productId);
    if (newQuantity > product.available) {
      newQuantity = product.available;
    }
    
    setCart(cart.map(item => 
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const handlePlaceOrder = () => {
    if (!selectedDealer) {
      alert('Please select a dealer');
      return;
    }
    
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    setIsPlacingOrder(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      router.push('/orders');
      
      // Show success message
      alert('Order placed successfully');
    }, 1500);
  };
  
  return (
    <GradientBackground>
      <Stack.Screen options={{ headerShown: true, title: 'Place Order' }} />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dealer</Text>
          
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dealerSelector} 
              onPress={() => setShowDealerDropdown(!showDealerDropdown)}
            >
              <Text style={selectedDealer ? styles.selectedDealerText : styles.placeholderText}>
                {selectedDealer ? selectedDealer.name : 'Select a dealer'}
              </Text>
            </TouchableOpacity>
            
            {showDealerDropdown && (
              <View style={styles.dropdown}>
                <TextInput
                  style={styles.dropdownSearch}
                  placeholder="Search dealers..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {filteredDealers.map(dealer => (
                    <TouchableOpacity
                      key={dealer.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedDealer(dealer);
                        setShowDealerDropdown(false);
                        setSearchQuery('');
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{dealer.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Products</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.productsList}>
            {filteredProducts.map(product => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>₹{product.price} per {product.unit}</Text>
                  <Text style={styles.productAvailable}>{product.available} {product.unit}s available</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Plus size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        
        {cart.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Order</Text>
            
            <View style={styles.cartList}>
              {cart.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>₹{item.price} per {item.unit}</Text>
                  </View>
                  
                  <View style={styles.cartItemActions}>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} color="#3DD39E" />
                      </TouchableOpacity>
                      
                      <TextInput
                        style={styles.quantityInput}
                        value={item.quantity.toString()}
                        onChangeText={(text) => {
                          const newQuantity = parseInt(text) || 0;
                          updateQuantity(item.id, newQuantity);
                        }}
                        keyboardType="number-pad"
                      />
                      
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} color="#3DD39E" />
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <X size={16} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.cartItemSubtotal}>
                    Subtotal: ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>₹{calculateTotal().toLocaleString()}</Text>
            </View>
          </View>
        )}
        
        <Button 
          title="Place Order" 
          onPress={handlePlaceOrder} 
          style={styles.placeOrderButton}
          loading={isPlacingOrder}
          disabled={isPlacingOrder || !selectedDealer || cart.length === 0}
        />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 10,
  },
  dealerSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  selectedDealerText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 8,
    maxHeight: 300,
  },
  dropdownSearch: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dropdownList: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 16,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  productsList: {
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productAvailable: {
    fontSize: 12,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#3DD39E',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartList: {
    marginBottom: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cartItemInfo: {
    marginBottom: 12,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  cartItemSubtotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'right',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3DD39E',
  },
  placeOrderButton: {
    marginTop: 16,
  },
});