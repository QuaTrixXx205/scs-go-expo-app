import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Dữ liệu tĩnh mẫu
const chargeLogs = [
  {
    id: '1',
    title: 'Sạc điện',
    date: '18/07/2025 - 09:30',
    status: 'Phiên sạc của bạn đã kết thúc, dừng sạc từ ứng dụng',
    amount: 45000,
  },
  {
    id: '2',
    title: 'Sạc điện',
    date: '15/07/2025 - 20:15',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 60000,
  },
  {
    id: '3',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '4',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '5',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '6',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '7',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '8',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
  {
    id: '9',
    title: 'Sạc điện',
    date: '05/07/2025 - 14:10',
    status: 'Phiên sạc của bạn đã kết thúc',
    amount: 38000,
  },
];

export default function ChargeHistory() {
  const renderItem = ({ item }: { item: typeof chargeLogs[0] }) => (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <MaterialIcons name="bolt" size={28} color="#4cafef" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>
          {item.amount.toLocaleString('vi-VN')} đ
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header tháng năm */}
      <Text style={styles.header}>Tháng 7, 2025</Text>

      <FlatList
        data={chargeLogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 50
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    elevation: 3, // shadow Android
    shadowColor: '#000', // shadow iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#fff',
  },
  date: {
    fontSize: 13,
    color: '#ccc',
  },
  status: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 80,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4cafef',
  },
});
