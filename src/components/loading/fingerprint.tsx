import { BlurView } from 'expo-blur';
import { View as MView } from 'moti';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Animated, { Easing, useAnimatedStyle } from 'react-native-reanimated';
import { withSpring } from 'react-native-reanimated';

import { useResponsive } from '@/core';
import { ArrowDown, Fingerprint } from '@/ui/icons';

const _color = '#E4A243';
const _size = 65;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export default function SwipeFingerprint({onSwipe}: {onSwipe: () => void}) {
  const { vh } = useResponsive();
  const translationY = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const [, setRender] = React.useState(0);
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateY = vh(30);
      if (event.translationY > 0) {
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY,
        );
      }
    })
    .onEnd((e) => {
      if (Math.abs(e.velocityY) > 150 || translationY.value > 55) {
        translationY.value = withSpring(250, {
          duration: 2000,
          dampingRatio: 0.5,
          stiffness: 125,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
        });
        hasVoted.current = true;
        setRender((prev) => prev + 1);
        setTimeout(onSwipe, 300)
      } else {
        translationY.value = 0;
      }
    })
    .runOnJS(true);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
  }));
  const hasVoted = React.useRef(false);
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyles, {position:'relative'}]}>
        <WaveThingy />
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={25}
          style={{
            height: vh(20),
            width: 65,
            backgroundColor: '#0D0D0E',
            opacity: 0.7,
            position: 'absolute',
            top: 25,
            zIndex: -10,
            alignItems: 'center',
          }}
        >
          <View style={{ position: 'absolute', top: vh(5), zIndex: 100 }}>
            <ArrowDown size={50} />
          </View>
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
}

function WaveThingy() {
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  return (
    <View>
      <GestureDetector gesture={tap}>
        <MView
          style={{
            width: _size,
            height: _size,
            borderRadius: _size,
            backgroundColor: _color,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#FAEECD',
          }}
        >
          {[...Array(3).keys()].map((i) => (
            <MView
              key={i}
              from={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                loop: true,
                repeatReverse: false,
                duration: 2000,
                delay: i * 400,
                type: 'timing',
                easing: Easing.out(Easing.ease),
              }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  width: _size,
                  height: _size,
                  borderRadius: _size,
                  backgroundColor: _color,
                },
              ]}
            />
          ))}
          <Fingerprint size={35} />
        </MView>
      </GestureDetector>
    </View>
  );
}
