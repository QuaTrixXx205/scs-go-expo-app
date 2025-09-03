import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

function PostpaidScreen() {
  return (
    <View style={styles.content}>
      <MaterialIcons name="battery-alert" size={64} color="#4cafef" />
      <Text style={styles.title}>Không có hợp đồng thuê pin</Text>
      <Text style={styles.text}>
        Vui lòng liên hệ Hotline 1900 23 23 89 của VinFast để được hỗ trợ thông tin về hợp đồng thuê pin.
      </Text>
    </View>
  );
}

function PrepaidScreen() {
  return (
    <View style={styles.content}>
      <MaterialIcons name="battery-unknown" size={64} color="#4cafef" />
      <Text style={styles.title}>Không có hợp đồng thuê pin</Text>
      <Text style={styles.text}>
        Vui lòng liên hệ Hotline 1900 23 23 89 của VinFast để được hỗ trợ thông tin về hợp đồng thuê pin.
      </Text>
    </View>
  );
}

export default function RentBattery() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4cafef',
        tabBarInactiveTintColor: '#aaa',
        tabBarIndicatorStyle: { backgroundColor: '#4cafef', height: 3 },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Postpaid"
        component={PostpaidScreen}
        options={{ title: 'Gói cước trả sau' }}
      />
      <Tab.Screen
        name="Prepaid"
        component={PrepaidScreen}
        options={{ title: 'Gói cước trả trước' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#ccc',
    lineHeight: 20,
  },
});
