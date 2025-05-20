import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Search, Filter, ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';

// Product categories
const CATEGORIES = [
  { id: 'nitrogenous', name: 'Nitrogenous' },
  { id: 'phosphatic', name: 'Phosphatic' },
  { id: 'potassic', name: 'Potassic' },
];

// Mock PRODUCTS 
const PRODUCTS = [
  // Nitrogenous Products
  {
    id: '1',  // Changed from 'FERT-N01'
    name: 'Urea',
    category: 'nitrogenous',
    price: 600,
    unit: '50kg',
    available: 5000,
  },
  {
    id: '4',  // Changed from 'FERT-N02'
    name: 'Ammonium Sulphate',
    category: 'nitrogenous',
    price: 700,
    unit: '50Kg Bag',
    available: 3000,
  },
  {
    id: '6',  // Changed from 'FERT-N04'
    name: 'Ammonium Nitrate',
    category: 'nitrogenous',
    price: 750,
    unit: '50Kg Bag',
    available: 1800,
  },
  {
    id: '7',  // Changed from 'FERT-N05'
    name: 'Liquid Urea',
    category: 'nitrogenous',
    price: 500,
    unit: '20L Can',
    available: 1000,
  },
  {
    id: '8',  // Changed from 'FERT-N06'
    name: 'Urea Ammonium Nitrate',
    category: 'nitrogenous',
    price: 550,
    unit: '20L Can',
    available: 900,
  },
  {
    id: '9',  // Changed from 'FERT-N07'
    name: 'Ammonium Chloride',
    category: 'nitrogenous',
    price: 620,
    unit: '50Kg Bag',
    available: 2000,
  },
  {
    id: '10',  // Changed from 'FERT-N08'
    name: 'Slow Release Urea',
    category: 'nitrogenous',
    price: 850,
    unit: '50Kg Bag',
    available: 700,
  },
  {
    id: '11',  // Changed from 'FERT-N09'
    name: 'Nano Urea',
    category: 'nitrogenous',
    price: 300,
    unit: '500ml Bottle',
    available: 10000,
  },
  {
    id: '12',  // Changed from 'FERT-N10'
    name: 'Azotobacter Biofertilizer',
    category: 'nitrogenous',
    price: 550,
    unit: '1L Bottle',
    available: 1200,
  },

  // Phosphatic Products
  {
    id: '2',  // Changed from 'FERT-P01'
    name: 'DAP',
    category: 'phosphatic',
    price: 1500,
    unit: '50kg',
    available: 4000,
  },
  {
    id: '13',  // Changed from 'FERT-P02'
    name: 'Single Super Phosphate',
    category: 'phosphatic',
    price: 1200,
    unit: '50Kg Bag',
    available: 3500,
  },
  {
    id: '14',  // Changed from 'FERT-P03'
    name: 'Triple Super Phosphate',
    category: 'phosphatic',
    price: 1600,
    unit: '50Kg Bag',
    available: 3000,
  },
  {
    id: '15',  // Changed from 'FERT-P04'
    name: 'Monoammonium Phosphate',
    category: 'phosphatic',
    price: 1800,
    unit: '50Kg Bag',
    available: 2200,
  },
  {
    id: '16',  // Changed from 'FERT-P05'
    name: 'Rock Phosphate',
    category: 'phosphatic',
    price: 1000,
    unit: '50Kg Bag',
    available: 2000,
  },
  {
    id: '17',  // Changed from 'FERT-P06'
    name: 'Bio-Phosphate Fertilizer',
    category: 'phosphatic',
    price: 800,
    unit: '1L Bottle',
    available: 3000,
  },
  {
    id: '18',  // Changed from 'FERT-P07'
    name: 'Phosphoric Acid',
    category: 'phosphatic',
    price: 2000,
    unit: '20L Can',
    available: 900,
  },
  {
    id: '19',  // Changed from 'FERT-P08'
    name: 'Phosphate Solubilizing Bacteria',
    category: 'phosphatic',
    price: 850,
    unit: '1L Bottle',
    available: 1500,
  },
  {
    id: '20',  // Changed from 'FERT-P09'
    name: 'Nano Phosphorus Fertilizer',
    category: 'phosphatic',
    price: 400,
    unit: '500ml Bottle',
    available: 8000,
  },
  {
    id: '21',  // Changed from 'FERT-P10'
    name: 'Phosphorus Rich Compost',
    category: 'phosphatic',
    price: 700,
    unit: '50Kg Bag',
    available: 1200,
  },

  // Potassic Products
  {
    id: '22',  // Changed from 'FERT-K01'
    name: 'Muriate of Potash',
    category: 'potassic',
    price: 1700,
    unit: '50Kg Bag',
    available: 4000,
  },
  {
    id: '23',  // Changed from 'FERT-K02'
    name: 'Sulphate of Potash',
    category: 'potassic',
    price: 1900,
    unit: '50Kg Bag',
    available: 3500,
  },
  {
    id: '24',  // Changed from 'FERT-K03'
    name: 'Potassium Nitrate',
    category: 'potassic',
    price: 2000,
    unit: '50Kg Bag',
    available: 3000,
  },
  {
    id: '25',  // Changed from 'FERT-K04'
    name: 'Potassium Magnesium Sulphate',
    category: 'potassic',
    price: 1850,
    unit: '50Kg Bag',
    available: 1500,
  },
  {
    id: '26',  // Changed from 'FERT-K05'
    name: 'Potassium Sulphate Nitrate',
    category: 'potassic',
    price: 1950,
    unit: '50Kg Bag',
    available: 1000,
  },
  {
    id: '27',  // Changed from 'FERT-K06'
    name: 'Liquid Potassium Fertilizer',
    category: 'potassic',
    price: 1100,
    unit: '20L Can',
    available: 800,
  },
  {
    id: '28',  // Changed from 'FERT-K07'
    name: 'Potassium Carbonate',
    category: 'potassic',
    price: 1800,
    unit: '50Kg Bag',
    available: 1700,
  },
  {
    id: '29',  // Changed from 'FERT-K08'
    name: 'Potassium Humate',
    category: 'potassic',
    price: 900,
    unit: '1L Bottle',
    available: 2000,
  },
  {
    id: '30',  // Changed from 'FERT-K09'
    name: 'Bio-Potash Fertilizer',
    category: 'potassic',
    price: 850,
    unit: '1L Bottle',
    available: 2200,
  },
  {
    id: '31',  // Changed from 'FERT-K10'
    name: 'Nano Potassium',
    category: 'potassic',
    price: 450,
    unit: '500ml Bottle',
    available: 6000,
  }
];

export default function PlaceOrderScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('nitrogenous');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('0');
  const [showCartModal, setShowCartModal] = useState(false);
  const router = useRouter();

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter(product => 
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  const handleAddToCart = () => {
    if (!selectedProduct || parseInt(quantity) <= 0) return;
    
    // Only update cart if quantity has changed from initial value
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    const newQuantity = parseInt(quantity);
    
    if (existingItem) {
      // Only update if quantity is different from what's in cart
      if (existingItem.quantity !== newQuantity) {
        const updatedCart = cart.map(item => 
          item.id === selectedProduct.id
            ? {
                ...item,
                quantity: newQuantity,
                total: newQuantity * selectedProduct.price
              }
            : item
        );
        setCart(updatedCart);
      }
    } else {
      // Add new item
      const newItem = {
        ...selectedProduct,
        quantity: newQuantity,
        total: newQuantity * selectedProduct.price
      };
      setCart([...cart, newItem]);
    }
    
    setSelectedProduct(null);
    setQuantity('0');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (value) => {
    if (!selectedProduct) return;
    
    const newValue = Math.max(0, Math.min(parseInt(value) || 0, selectedProduct.available));
    setQuantity(newValue.toString());
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Prefill quantity if product is in cart
    const existingItem = cart.find(item => item.id === product.id);
    setQuantity(existingItem ? existingItem.quantity.toString() : '0');
  };

  const CartModal = () => {
    if (!showCartModal) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalBackdrop}>
          <View style={styles.cartModalContent}>
            <View style={styles.cartModalHeader}>
              <Text style={styles.cartModalTitle}>Cart</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCartModal(false)}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cartItemsList}>
              {cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemUnit}>{item.unit}</Text>
                    <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
                  </View>
                  <View style={styles.cartItemActions}>
                    <Text style={styles.cartItemTotal}>₹{item.total.toLocaleString()}</Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {cart.length > 0 ? (
              <View style={styles.cartFooter}>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total Amount:</Text>
                  <Text style={styles.totalAmount}>₹{calculateTotal().toLocaleString()}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.checkoutButton}
                  onPress={() => {
                    setShowCartModal(false);
                    router.push({
                      pathname: '/orders/summary',
                      params: {
                        cart: encodeURIComponent(JSON.stringify(cart))
                      }
                    });
                  }}
                >
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const ProductModal = () => {
    if (!selectedProduct) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedProduct(null)}
            >
              <X size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productUnit}>{selectedProduct.unit}</Text>
            
            <Text style={styles.productId}>Product ID: {selectedProduct.id}</Text>
            <Text style={styles.availableUnits}>Available Units: {selectedProduct.available}</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(parseInt(quantity) - 1)}
              >
                <Minus size={20} color="#000" />
              </TouchableOpacity>

              <TextInput
                style={styles.quantityInput}
                value={quantity}
                onChangeText={updateQuantity}
                keyboardType="numeric"
              />

              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(parseInt(quantity) + 1)}
              >
                <Plus size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>
              Without GST ₹{(parseInt(quantity) * selectedProduct.price).toLocaleString()}
            </Text>

            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => {
                handleAddToCart();
                setSelectedProduct(null);
              }}
            >
              <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerTitle: "Place Order",
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => setShowCartModal(true)}
              >
                <ShoppingCart size={24} color="#000" />
                {cart.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <View style={styles.container}>
        <View style={styles.partyInfo}>
          <Text style={styles.partyInfoTitle}>Party Info:</Text>
          <View style={styles.partyInfoRow}>
            <View style={styles.partyInfoItem}>
              <Text style={styles.partyInfoLabel}>Name:</Text>
              <Text style={styles.partyInfoValue}>XXXX</Text>
            </View>
            <View style={styles.partyInfoItem}>
              <Text style={styles.partyInfoLabel}>ID:</Text>
              <Text style={styles.partyInfoValue}>XXXX</Text>
            </View>
          </View>
        </View>

        <View style={styles.balance}>
          <Text style={styles.balanceTitle}>Balance:</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Utilized:</Text>
              <Text style={styles.balanceValue}>XXXX</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Available Limit:</Text>
              <Text style={styles.balanceValue}>XXXX</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Products Categories:</Text>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your orders"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.productList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productListContent}
        >
          {filteredProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            return (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductSelect(product)}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productCardName}>{product.name}</Text>
                  <Text style={styles.productCardId}>ID: {product.id}</Text>
                  <Text style={styles.productCardUnit}>{product.unit}</Text>
                  {cartItem && (
                    <Text style={styles.productCardQuantity}>
                      In cart: {cartItem.quantity}
                    </Text>
                  )}
                </View>
                <View style={styles.productPrice}>
                  <Text style={styles.priceText}>₹{product.price}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handleProductSelect(product)}
                  >
                    <Text style={styles.addButtonText}>
                      {cartItem ? 'Update' : 'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {cart.length > 0 && (
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => {
              if (cart.length > 0) {
                router.push({
                  pathname: '/orders/summary',
                  params: {
                    cart: encodeURIComponent(JSON.stringify(cart))
                  }
                });
              }
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        <ProductModal />
        <CartModal />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: '600',
    color: '#000',
  },
});