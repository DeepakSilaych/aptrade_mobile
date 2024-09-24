import { BlurView } from 'expo-blur';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { type SharedValue } from 'react-native-reanimated';

import { useResponsive } from '@/core';


interface DialogProps {
  isOpen: SharedValue<boolean>;
  toggleDialog: () => void;
  children: React.ReactNode;
  duration?: number;
  width: number,
  height: number
}

export const Dialog: React.FC<DialogProps> = ({ isOpen ,toggleDialog , duration = 500, children, width, height }) => {
  const {vw} = useResponsive()
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 3
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  const dialogBackdrop = useAnimatedStyle(() => ({
    zIndex: isOpen.value
      ? 2
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  const dialogStyle = useAnimatedStyle(() => ({
    opacity: withTiming( isOpen.value ? 1 : 0, {duration: 500} ),
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  return (
    <>
      {/* Backdrop  */}
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{flex: 1}} onPress={toggleDialog} />
      </Animated.View>
      {/* Dialog  */}
      <Animated.View style={[dialogBackdrop, {flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', height: '100%', width:vw(100)}]}>
        <Animated.View
          style={[dialogStyle, {width: width, height: height, overflow: 'hidden', zIndex: 999,  borderRadius:20}]}>
            <BlurView intensity={30} tint='light' style={{width: width, height: height}}>

            </BlurView>
          {children}
        </Animated.View>
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