import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { type SharedValue } from 'react-native-reanimated';

import useResponsive from '@/core/hooks/use-responsive';

interface BottomSheetProps {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  children: React.ReactNode;
  duration?: number;
  sheetHeight: number;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, toggleSheet, duration = 500, children, sheetHeight }) => {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );
  const { vw } = useResponsive();
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  useEffect(() => {
    console.log("open")
  }, [isOpen])

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{flex: 1}} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, {width: vw(100), height: sheetHeight, overflow: 'hidden', zIndex: 100}]}>
          <BlurView intensity={40} tint='light' style={{width: vw(100), height: sheetHeight}}>
            {children}
          </BlurView>
      </Animated.View>
    </>
  );
  }

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    paddingRight: 32,
    paddingLeft: 32,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});