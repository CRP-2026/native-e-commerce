// app/product/[id].tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
// import { useStore } from '~/lib/store/store';
import { formatCurrency } from '~/lib/utils/formatters';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  // const { addToCart, toggleFavorite, isFavorite } = useStore();

  // Mock product data - replace with API call
  const product = {
    id: id || '1',
    name: 'Premium Wireless Headphones',
    price: 299000,
    originalPrice: 399000,
    rating: 4.5,
    reviews: 128,
    image: 'https://via.placeholder.com/400',
    description:
      'Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Premium comfort design',
      'Built-in microphone',
      'Foldable design',
    ],
    inStock: true,
    stock: 15,
  };

  // const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    // addToCart({
    //   productId: product.id,
    //   product,
    //   quantity,
    //   price: product.price,
    //  });
  };

  const handleToggleFavorite = () => {
    // toggleFavorite(product.id);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Product Details',
          headerRight: () => (
            <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
              <Text style={[styles.favoriteIcon, { color: '#999' }]}>♥</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.container}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.originalPrice > product.price && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )}
                %
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={[styles.stockStatus, { color: product.inStock ? '#34C759' : '#FF3B30' }]}>
              {product.inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer - Quantity & Add to Cart */}
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    marginBottom: 24,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 18,
    color: '#34C759',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    marginRight: 16,
  },
  favoriteIcon: {
    fontSize: 24,
  },
});
