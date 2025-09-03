import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

const chips = [
  { key: 'station', label: 'Trạm sạc', icon: 'ev-station' },
  { key: 'agency', label: 'Đại lý', icon: 'store' },
  { key: 'service', label: 'Xưởng dịch vụ', icon: 'build' },
];

const DATA = [
  {
    id: '1',
    name: 'Trạm sạc VinFast Landmark 81',
    address: '720A Điện Biên Phủ, Bình Thạnh',
    type: 'Trạm công cộng - Gửi xe miễn phí',
    hours: '06:00 - 23:00',
    status: { text: 'Cổng sạc sẵn sàng', color: 'green', icon: 'check-circle' },
    coords: { latitude: 10.7942, longitude: 106.722 },
  },
  {
    id: '2',
    name: 'Trạm sạc VinFast Crescent Mall',
    address: '101 Tôn Dật Tiên, Quận 7',
    type: 'Trạm công cộng - Gửi xe trả phí',
    hours: '08:00 - 22:00',
    status: { text: 'Đang bảo trì', color: 'red', icon: 'error' },
    coords: { latitude: 10.728, longitude: 106.718 },
  },
];

export default function ChargeStationLocation() {
  const [selectedChip, setSelectedChip] = useState('station');

  return (
    <View style={styles.container}>
      {/* Chip menu */}
      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <TouchableOpacity
            key={chip.key}
            style={[styles.chip, selectedChip === chip.key && styles.chipActive]}
            onPress={() => setSelectedChip(chip.key)}
          >
            <MaterialIcons
              name={chip.icon as any}
              size={18}
              color={selectedChip === chip.key ? '#fff' : '#007AFF'}
            />
            <Text
              style={[
                styles.chipText,
                selectedChip === chip.key && { color: '#fff' },
              ]}
            >
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.7769,
          longitude: 106.7009,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}
      >
        {DATA.map((item) => (
          <Marker
            key={item.id}
            coordinate={item.coords}
            title={item.name}
            description={item.type}
          />
        ))}
      </MapView>

      {/* List of stations */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <MaterialIcons name="ev-station" size={28} color="#007AFF" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.address}</Text>
                <Text style={styles.cardText}>{item.type}</Text>
                <Text style={styles.cardText}>Giờ mở cửa: {item.hours}</Text>
                <View style={styles.statusRow}>
                  <MaterialIcons
                    name={item.status.icon as any}
                    size={18}
                    color={item.status.color}
                  />
                  <Text style={{ color: item.status.color, marginLeft: 4 }}>
                    {item.status.text}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.cardRight}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="directions" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="info" size={22} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },

  chipRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    backgroundColor: '#1c1c1e',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  chipActive: { backgroundColor: '#007AFF' },
  chipText: { marginLeft: 6, color: '#007AFF', fontSize: 14 },

  map: { flex: 1 },

  list: { flex: 1, padding: 10 },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardLeft: { flexDirection: 'row', flex: 1 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cardText: { color: '#ccc', fontSize: 13, marginTop: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },

  cardRight: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
  },
  iconButton: {
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    padding: 6,
  },
});
