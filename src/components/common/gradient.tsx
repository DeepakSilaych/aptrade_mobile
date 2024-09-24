import React, { useEffect } from 'react';
import { type DimensionValue, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Defs, Ellipse, RadialGradient, Stop, Svg } from 'react-native-svg';

interface Props {
  inColor: string;
  outColor: string;
  top: DimensionValue;
  left: DimensionValue;
  xRadius: number;
  yRadius: number;
  inOpacity: number;
  outOpacity: number;
  zIndex: number;
  delay: number;
  revealDuration: number;
}

const Gradient = ({
  inColor,
  outColor,
  top,
  left,
  xRadius,
  yRadius,
  inOpacity,
  outOpacity,
  zIndex,
  delay,
  revealDuration,
}: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: revealDuration,
        easing: Easing.linear,
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [opacity, delay, revealDuration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      style={{ position: 'absolute', left: left, top: top, zIndex: zIndex }}
    >
      <Animated.View style={animatedStyle}>
        <Svg height="800" width="800">
          <Defs>
            <RadialGradient
              id="grad1"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="0%" stopColor={inColor} stopOpacity={inOpacity} />
              <Stop
                offset="100%"
                stopColor={outColor}
                stopOpacity={outOpacity}
              />
            </RadialGradient>
          </Defs>
          <Ellipse
            cx={xRadius}
            cy={yRadius}
            rx={xRadius}
            ry={yRadius}
            fill="url(#grad1)"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Gradient;
