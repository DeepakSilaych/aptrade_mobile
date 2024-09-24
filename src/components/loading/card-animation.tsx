import React from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useResponsive } from '@/core/hooks';

import {
  GoldClub,
  GoldDiamond,
  GoldHeart,
  GoldSpade,
  SilverClub,
  SilverDiamond,
  SilverHeart,
  SilverSpade,
} from '../common//loading-cards';

const PI = Math.PI;

const theta1 = (15 / 180) * PI;
const theta2 = (5 / 180) * PI;
const theta3 = -(5 / 180) * PI;
const theta4 = -(15 / 180) * PI;

const cards1 = [
  {
    card: (width: number, height: number) => (
      <SilverDiamond width={width} height={height} />
    ),
    theta: theta4,
  },
  {
    card: (width: number, height: number) => (
      <SilverSpade width={width} height={height} />
    ),
    theta: theta3,
  },
  {
    card: (width: number, height: number) => (
      <SilverHeart width={width} height={height} />
    ),
    theta: theta2,
  },
  {
    card: (width: number, height: number) => (
      <SilverClub width={width} height={height} />
    ),
    theta: theta1,
  },
];

const cards2 = [
  {
    card: (width: number, height: number) => (
      <GoldDiamond width={width} height={height} />
    ),
    theta: theta4,
  },
  {
    card: (width: number, height: number) => (
      <GoldSpade width={width} height={height} />
    ),
    theta: theta3,
  },
  {
    card: (width: number, height: number) => (
      <GoldHeart width={width} height={height} />
    ),
    theta: theta2,
  },
  {
    card: (width: number, height: number) => (
      <GoldClub width={width} height={height} />
    ),
    theta: theta1,
  },
];

const RotatingCard = ({
  finalAngle,
  card,
}: {
  finalAngle: number;
  card: (typeof cards1)[number];
}) => {
  const { wp, hp } = useResponsive();
  const mounted = useSharedValue(0);

  const RADIUS = hp(35);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            mounted.value,
            [0, 1],
            [0, RADIUS * finalAngle],
          ),
        },
        { rotate: `${interpolate(mounted.value, [0, 1], [0, finalAngle])}rad` },
        {
          translateY: interpolate(
            mounted.value,
            [0, 1],
            [0, RADIUS * finalAngle * finalAngle],
          ),
        },
      ],
    };
  });
  React.useEffect(() => {
    const timer = setTimeout(() => {
      mounted.value = withTiming(1, { duration: 1300 });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Animated.View
      style={[animatedStyle, { position: 'absolute', top: 0, zIndex: 50 }]}
    >
      {card.card(wp(25), wp(40))}
    </Animated.View>
  );
};

export const CardAnimationGold = () => {
  return (
    <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
      {cards2.map((card, index) => (
        <RotatingCard key={index} finalAngle={card.theta} card={card} />
      ))}
    </View>
  );
};

export const CardAnimationSilver = () => {
  return (
    <View style={{ position: "relative", alignItems: "center" }}>
      {cards1.map((card, index) => (
        <RotatingCard key={index} finalAngle={card.theta} card={card} />
      ))}
    </View>
  );
};

export const GoldCardsStatic = () => {
  const { wp, hp} = useResponsive();
  const RADIUS = hp(35);
  return (
    <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
      {cards2.map((card, index) => (
        <View key={index}
            style={{ position: 'absolute', top: 0, zIndex: 50, transform: [{ rotate: `${card.theta}rad` }, { translateX: RADIUS * card.theta }, { translateY: RADIUS * card.theta * card.theta * card.theta * card.theta }] }}
          >
            {card.card(wp(25), wp(40))}
          </View>
      ))}
    </View>
  );
};