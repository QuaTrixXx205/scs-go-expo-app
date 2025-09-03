import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function vehicle() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{width: '100%', padding: insets.top + 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={require('@/assets/images/ebike-img.png')} style={{ resizeMode: 'contain', width: 200, height: 200 }} />
      </View>
      <View>
        <ThemedText type="default" style={{ textAlign: 'center', marginBottom: 20 }}>Tài khoản chưa được liên kết với xe? Vui lòng kiểm tra lại số điện thoại đăng ký tài khoản hoặc liên hệ với đại lý để được hỗ trợ!</ThemedText>
      </View>
    </View>
  )
}