import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Notification() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="notifications-none" size={72} color="#888" />
      <Text style={styles.title}>Chưa có thông báo nào</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 12,
  },
});
