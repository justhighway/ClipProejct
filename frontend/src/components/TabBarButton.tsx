import React, {useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Animated} from 'react-native'; // Step 1
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TABBAR_HEIGHT = 49;

export default function TabBarButton({onPress}) {
  const insets = useSafeAreaInsets();
  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  // Step 2: Use Animated.View instead of View
  const rotationAnimation = useRef(new Animated.Value(0)).current;

  // Step 5: Introduce rotated state variable
  const [rotated, setRotated] = useState(false);

  const rotateButton = () => {
    const toValue = rotated ? 0 : 1; // Toggle rotation
    Animated.timing(rotationAnimation, {
      toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
    setRotated(!rotated);
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          bottom,
          transform: [
            {
              rotate: rotationAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '135deg'],
              }),
            },
          ],
        },
      ]}>
      <Pressable
        android_ripple={{
          // 리플: 물결 효과
          color: 'ffffff',
        }}
        style={styles.circle}
        onPress={() => {
          rotateButton();
          onPress();
        }}>
        <MaterialIcons name="plus" color="white" size={40} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5, // zIndex는 뷰의 쌓임 순서를 결정 (큰 값일수록 위에 쌓임)
    borderRadius: 10,
    height: 60,
    width: 60,
    position: 'absolute',
    justifyContent: 'center',
    left: '43%',
    // transform: [
    //   // 중앙 정렬 및 좌우 이동
    //   {
    //     translateX: 100,
    //   },
    // ],
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#4d4d4d',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 5,
    //     overflow: 'hidden',
    //   },
    // }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
