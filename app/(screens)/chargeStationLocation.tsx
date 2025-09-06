import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const chips = [
  { key: "all", label: "Tất cả", icon: "apps" },
  { key: "station", label: "Trạm sạc", icon: "ev-station" },
  { key: "agency", label: "Đại lý", icon: "store" },
  { key: "service", label: "Xưởng dịch vụ", icon: "build" },
];

const DATA = [
  {
    id: "1",
    name: "Trạm VinFast Landmark 81",
    address: "720A Điện Biên Phủ, Bình Thạnh",
    type: "Trạm công cộng - Gửi xe miễn phí",
    hours: "06:00 - 23:00",
    status: { text: "Cổng sạc sẵn sàng", color: "green", icon: "check-circle" },
    coords: { latitude: 10.7942, longitude: 106.722 },
    chipType: "station",
    ports: 6,
    connector: "CCS2 - Xe ô tô điện",
  },
  {
    id: "2",
    name: "Trạm VinFast Crescent Mall",
    address: "101 Tôn Dật Tiên, Quận 7",
    type: "Trạm công cộng - Gửi xe trả phí",
    hours: "08:00 - 22:00",
    status: { text: "Đang bảo trì", color: "red", icon: "error" },
    coords: { latitude: 10.728, longitude: 106.718 },
    chipType: "station",
    ports: 4,
    connector: "AC - Xe máy điện",
  },
  {
    id: "3",
    name: "Đại lý VinFast Quận 1",
    address: "123 Hai Bà Trưng, Quận 1",
    type: "Đại lý chính hãng",
    hours: "08:00 - 20:00",
    status: { text: "Đang mở cửa", color: "green", icon: "check-circle" },
    coords: { latitude: 10.78, longitude: 106.7 },
    chipType: "agency",
    ports: 2,
    connector: "AC - Xe máy điện",
  },
  {
    id: "4",
    name: "Xưởng dịch vụ VinFast Quận 3",
    address: "45 CMT8, Quận 3",
    type: "Xưởng sửa chữa & dịch vụ",
    hours: "07:00 - 19:00",
    status: { text: "Đang phục vụ", color: "green", icon: "check-circle" },
    coords: { latitude: 10.78, longitude: 106.68 },
    chipType: "service",
    ports: 3,
    connector: "CCS2 - Xe ô tô điện",
  },
];

export default function ChargeStationLocation() {
  const [selectedChip, setSelectedChip] = useState("station");

  const filteredData =
    selectedChip === "all" ? DATA : DATA.filter((item) => item.chipType === selectedChip);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  // @ts-ignore
  const handleConfirm = (date: Date) => {
    const message = `Đã đặt lịch cho ${selectedItem?.name} vào ${date.toLocaleString("vi-VN")}`;
    setNotification(message);

    hideDatePicker();
    setSelectedItem(null);

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Chip menu */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#1c1c1e', flexGrow: 0 }}>
        <View style={styles.chipRow}>
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip.key}
              style={[
                styles.chip,
                selectedChip === chip.key && styles.chipActive,
              ]}
              onPress={() => setSelectedChip(chip.key)}
            >
              <MaterialIcons
                name={chip.icon as any}
                size={18}
                color={selectedChip === chip.key ? "#fff" : "#007AFF"}
              />
              <Text
                style={[
                  styles.chipText,
                  selectedChip === chip.key && { color: "#fff" },
                ]}
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Notification */}
      {notification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

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
        {filteredData.map((item) => (
          <Marker
            key={item.id}
            coordinate={item.coords}
            title={item.name}
            description={item.type}
          />
        ))}
      </MapView>

      {/* List */}
      <FlatList
        data={filteredData}
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
                <Text style={styles.cardText}>
                  Cổng sạc khả dụng: {item.ports}
                </Text>
                <Text style={styles.cardText}>
                  Loại cổng: {item.connector}
                </Text>
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

            {/* Buttons */}
            <View style={styles.cardRight}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="directions" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="info" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setSelectedItem(item);   // lưu item đang chọn
                  showDatePicker();        // mở picker
                }}
              >
                <MaterialIcons name="event" size={22} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.list}
      />

      {/* Datepicker */}
      <View style={{ position: 'absolute', bottom: 100, left: 10, right: 10 }}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },

  chipRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    backgroundColor: "#1c1c1e",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: { backgroundColor: "#007AFF" },
  chipText: { marginLeft: 6, color: "#007AFF", fontSize: 14 },

  map: { height: '40%' },

  list: { flex: 1, padding: 10, marginBottom: 50 },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardLeft: { flexDirection: "row", flex: 1 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cardText: { color: "#ccc", fontSize: 13, marginTop: 2 },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },

  cardRight: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginLeft: 8,
  },
  iconButton: {
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    padding: 6,
  },
  notification: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  notificationText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },

});
