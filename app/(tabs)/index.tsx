// screens/HomeScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 200; // chỉnh theo ý bạn
const SLIDE_WIDTH = SCREEN_WIDTH - 40; // để có margin 20 hai bên

const sampleImages = [
  // Thay bằng url/require của bạn
  'https://thegioixechaydien.com.vn/uploads/files/bai-viet/nguoi-dung/tin-hay/2016/thang-09/baner-xe-dap-dien/baner-xe-dap-dien-16.jpg',
  'https://xetreem.com.vn/public/uploads/c5px-banner-xe-may.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHLPgrEGld4zHinFA1L9Bn_WA8zXy7Ccm-A&s',
];

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState<number>(0);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  function onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SLIDE_WIDTH);
    setIndex(newIndex);
  }

  function goToSlide(i: number) {
    setIndex(i);
    scrollRef.current?.scrollTo({ x: i * SLIDE_WIDTH, y: 0, animated: true });
  }

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % sampleImages.length;
      goToSlide(nextIndex);
    }, 3000); // 3s

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={[styles.page, { paddingTop: insets.top + 16 }]}>
      <View style={styles.carouselWrap}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          snapToInterval={SLIDE_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={styles.scrollContent}
        >
          {sampleImages.map((uri, i) => (
            <View key={i} style={styles.slideContainer}>
              <Image
                source={uri}
                style={styles.image}
                contentFit="cover"
                transition={250}
                accessibilityLabel={`slide-${i}`}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Indicators as bars (buttons) */}
      <View style={styles.indicatorRow} pointerEvents="box-none">
        {sampleImages.map((_, i) => {
          const active = i === index;
          return (
            <Pressable
              key={i}
              onPress={() => goToSlide(i)}
              style={[styles.barButton, active && styles.barButtonActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <View style={[styles.barInner, active && styles.barInnerActive]} />
            </Pressable>
          );
        })}
      </View>

      {/* widget */}
      <View style={styles.widgetContainer}>
        <View>
          <Text style={{ marginVertical: 10, color: '#fff', fontSize: 18, textAlign: 'left' }}>Tiện ích</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/codeScaner")}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="qr-code-scanner" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Quét mã QR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/chargeHistory")}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="history" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Lịch sử sạc</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/rentBattery")}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="battery-charging-full" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Thuê pin</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* widget */}
      <View style={styles.widgetContainer}>
        <View>
          <Text style={{ marginVertical: 10, color: '#fff', fontSize: 18, textAlign: 'left' }}>Địa điểm</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/chargeStationLocation")}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="charging-station" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Trạm sạc</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="store" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Đại lý</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#0389ffff', '#036469ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBg}
            >
              <MaterialIcons name="build-circle" size={36} color="#fff" />
              <Text style={styles.actionLabel}>Xưởng dịch vụ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
    alignItems: 'center',
    textAlign: 'left'
  },

  // Thùng carousel có bo góc + shadow
  carouselWrap: {
    width: SLIDE_WIDTH,
    height: CAROUSEL_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden', // bắt buộc để bo góc ảnh
    backgroundColor: '#111', // fallback khi ảnh tải chậm
    // Shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    // Elevation Android
    elevation: 6,
  },

  scrollContent: {
    // để các slide nằm sát nhau (no gap)
    alignItems: 'center',
  },

  slideContainer: {
    width: SLIDE_WIDTH,
    height: CAROUSEL_HEIGHT,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  // Indicator row dưới
  indicatorRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10, // note: gap supported RN 0.71+, nếu ko có thì dùng margin on children
  },

  barButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  barButtonActive: {
    // tùy chỉnh khi active (ví dụ lớn hơn)
    paddingHorizontal: 2,
  },

  barInner: {
    width: 28,
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)', // non-active
  },

  barInnerActive: {
    width: 44,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#fff', // active (bạn có thể đổi thành màu theme)
  },

  ///////////////
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12
  },

  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden', // quan trọng để bo góc gradient
  },

  gradientBg: {
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionLabel: {
    marginTop: 8,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  widgetContainer : {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  }
  //////////////
});
