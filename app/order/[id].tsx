// app/order/[id].tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { formatCurrency, formatDate } from '~/lib/utils/formatters';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock order data - replace with API call
  const order = {
    id: id || 'ORD001',
    date: new Date('2024-01-15'),
    status: 'shipped',
    total: 500000,
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        name: 'USB-C Cable',
        price: 50000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '3',
        name: 'Phone Case',
        price: 151000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      phone: '0123456789',
      address: '123 Main Street, Apt 4B',
      city: 'Ho Chi Minh City',
    },
    paymentMethod: 'Credit Card',
    tracking: 'SHIP123456789',
    estimatedDelivery: new Date('2024-01-18'),
    timeline: [
      { status: 'Order Placed', date: new Date('2024-01-15'), completed: true },
      { status: 'Processing', date: new Date('2024-01-16'), completed: true },
      { status: 'Shipped', date: new Date('2024-01-17'), completed: true },
      { status: 'Out for Delivery', date: new Date('2024-01-18'), completed: false },
      { status: 'Delivered', date: new Date('2024-01-18'), completed: false },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#34C759';
      case 'shipped':
        return '#FF9500';
      case 'pending':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Order Details' }} />

      <ScrollView style={styles.container}>
        {/* Order Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={styles.statusText}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Tracking */}
        <View style={styles.trackingContainer}>
          <Text style={styles.sectionTitle}>Tracking Number</Text>
          <View style={styles.trackingBox}>
            <Text style={styles.tracking}>{order.tracking}</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Delivery Timeline</Text>
          {order.timeline.map((event, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineCircle,
                    { backgroundColor: event.completed ? '#34C759' : '#ddd' },
                  ]}
                />
                {index < order.timeline.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      { backgroundColor: event.completed ? '#34C759' : '#ddd' },
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatus}>{event.status}</Text>
                <Text style={styles.timelineDate}>{formatDate(event.date)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Items */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        {/* Shipping Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
            <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
            <Text style={styles.addressText}>{order.shippingAddress.city}</Text>
            <Text style={styles.addressText}>Phone: {order.shippingAddress.phone}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(order.total * 0.9)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>{formatCurrency(order.total * 0.1)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.methodLabel}>Payment Method</Text>
            <Text style={styles.methodValue}>{order.paymentMethod}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  trackingContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  trackingBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  tracking: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  copyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timelineContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    height: 40,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    color: '#666',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  addressBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  paymentMethod: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  methodLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  methodValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    marginTop: 12,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
