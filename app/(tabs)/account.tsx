import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Account() {
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [langVN, setLangVN] = useState(true);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 16, paddingHorizontal: 8 }]}>
      {/* User Info */}
      <View style={styles.userBox}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Nguyễn Văn A</Text>
          <Text style={styles.phone}>+84 912 345 678</Text>
          <Text style={styles.since}>Hoạt động từ 01/07/2022</Text>
        </View>
      </View>

      {/* Settings List */}
      <View style={styles.listBox}>
        {/* FaceID */}
        <View style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="face" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Đăng nhập bằng FaceID</Text>
          </View>
          <Switch
            value={faceIdEnabled}
            onValueChange={setFaceIdEnabled}
            trackColor={{ false: '#767577', true: '#4cafef' }}
            thumbColor={faceIdEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Normal buttons */}
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="local-offer" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Khuyến mại</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="menu-book" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Hướng dẫn sử dụng</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="help-outline" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Câu hỏi thường gặp</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="support-agent" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Trung tâm trợ giúp</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="contact-support" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Yêu cầu hỗ trợ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <MaterialIcons name="description" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Điều khoản sử dụng</Text>
          </View>
        </TouchableOpacity>

        {/* Language switch */}
        {/* Language switch */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => setLangVN(!langVN)}
        >
          <View style={styles.itemLeft}>
            <FontAwesome name="language" size={24} color="#4cafef" />
            <Text style={styles.itemText}>Đổi ngôn ngữ</Text>
          </View>
          <View style={styles.langSwitch}>
            {langVN ? (
              <Text style={styles.flag}>🇻🇳</Text>
            ) : (
              <Text style={styles.flag}>🇺🇸</Text>
            )}
          </View>
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity style={[styles.listItem, styles.logoutItem]}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="logout" size={24} color="#ff4444" />
          <Text style={[styles.itemText, { color: '#ff4444' }]}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userBox: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  phone: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  since: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  listBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  langSwitch: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  flag: {
    fontSize: 20,
  },
  logoutItem: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 20
  },
});
