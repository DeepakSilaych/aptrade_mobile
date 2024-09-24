import * as Haptics from 'expo-haptics';
import * as React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextStyle} from "react-native";
import { Text,View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import {
  Extrapolation,
  interpolate,
  measure,
  type SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring} from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedText({
  style,
  text,
}: {
  style?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
  text: Animated.SharedValue<number>;
}): React.ReactElement {
  const animatedProps = useAnimatedProps(() => {
    return { text: String(text.value.toFixed(0)) } as unknown as TextInputProps;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid='transparent'
      editable={false}
      value={String(text.value.toFixed(0))}
      style={[styles1.text, style]}
      animatedProps={animatedProps}
    />
  );
}

const styles1 = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 15
  },
});

// Extra
const clamp = (a: number, min = 0, max = 1) => {
    "worklet";
    return Math.min(max, Math.max(min, a));
  };
  
  const hitSlop = {
    left: 25,
    bottom: 25,
    right: 25,
    top: 25,
  };
  
  export const layout = {
    spacing: 8,
    radius: 2,
    knobSize: 24,
    indicatorSize: 48,
  };
  
  export const colors = {
    purple: "#683FC2",
    blue: "#007AFF",
    green: "#34C759",
    gold:'#EAA544'
  };
  
  type ColorShades = {
    [key in keyof typeof colors]: {
      base: string;
      light: string;
      dark: string;
    };
  };
  
  const colorShades: ColorShades = Object.entries(colors).reduce(
    (acc, [key, value]) => {
      acc[key as keyof typeof colors] = {
        base: value,
        light: `${value}55`,
        dark: `${value}DD`,
      };
      return acc;
    },
    {} as ColorShades
  );
  
  
  export function Slider({ stepSize, minValue, maxValue, progress, width }: {withSensor: boolean, stepSize: number, minValue: number, maxValue: number, progress: SharedValue<number>, width: number}) {
    const x = useSharedValue(0);
    const isPanActive = useSharedValue(false);
    const knobScale = useDerivedValue(() => {return withSpring(isPanActive.value ? 1 : 0);});
    const knobScale2 = useDerivedValue(() => {return withSpring(isPanActive.value ? 0.5 : 0);});
    const aRef = useAnimatedRef<View>();
    const panGesture = Gesture.Pan()
      .averageTouches(true)
      .activateAfterLongPress(1)
      .onBegin(() => {
        isPanActive.value = true;
      })
      .onChange((ev) => {
        const size = measure(aRef);
        if (!size) {return;}
        x.value = clamp((x.value += ev.changeX), 0, size.width);
        console.log(size.width)
        console.log(width)
        const rawProgress = x.value / size.width;
        progress.value = Math.round((minValue + rawProgress * (maxValue - minValue)) / stepSize) * stepSize;
        })
      .onEnd(() => {
        isPanActive.value = false;
      })
    const animatedStyle = useAnimatedStyle(() => {
      return {borderWidth: interpolate(knobScale.value,[0, 1],[layout.knobSize / 2, 2],Extrapolation.CLAMP),
        borderColor: colorShades.gold.base,transform: [{translateX: x.value,},{scale: knobScale2.value + 1,},],};
      });
      const setProgress = (amount: number, value: number) => {
        if(amount === minValue){
          x.value = 0;
        }else if(amount === maxValue){
          x.value = width;
        }else{
          x.value = width/2;
        }
        progress.value = value;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); 
      }
    return (
      <>
        <View style={{gap:20, paddingHorizontal: width/8}}>
          <Amount progress={progress} />
          <GestureHandlerRootView>
              <GestureDetector gesture={panGesture}>
                  <View ref={aRef} style={[styles.slider, {position: 'absolute', width: width}]} hitSlop={hitSlop} >
                      <Animated.View style={[styles.progress, { width: x }]} />
                      <Animated.View  style={[styles.knob, animatedStyle]} />
                  </View>
              </GestureDetector>
          </GestureHandlerRootView>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginTop: 10}}>
            <Pressable onPress={() => setProgress(minValue, minValue)} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, width:75, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, borderColor:'rgba(255,255,255,0.3)', borderWidth:2, zIndex:50}}>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>₹</Text>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>{minValue}</Text>
            </Pressable>
            <Pressable onPress={() => setProgress((maxValue + stepSize + minValue)/2, (maxValue + minValue)/2)} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, width:75, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, borderColor:'rgba(255,255,255,0.3)', borderWidth:2, zIndex:50}}>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>₹</Text>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>{(maxValue+minValue)/2}</Text>
            </Pressable>
            <Pressable onPress={() => setProgress(maxValue, maxValue)} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, width:75, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, borderColor:'rgba(255,255,255,0.3)', borderWidth:2, zIndex:50}}>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>₹</Text>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Satoshi-Bold'}}>{maxValue}</Text>
            </Pressable>
        </View>
        </View>
      </>
    );
  }

  const Amount = ({progress}: {progress: SharedValue<number>}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'Satoshi-Bold'}}>₹</Text>
          <AnimatedText text={progress} style={{color: 'white', fontSize: 20, fontFamily: 'Satoshi-Bold'}} />
        </View>
      </View>
    )
  }
  const styles = StyleSheet.create({
    knob: {
      width: layout.knobSize,
      height: layout.knobSize,
      borderRadius: layout.knobSize / 2,
      backgroundColor: colorShades.gold.base,
      borderWidth: layout.knobSize / 2,
      borderColor: colorShades.gold.base,
      position: "absolute",
      left: -layout.knobSize / 2,
    },
    slider: {
      width: "100%",
      backgroundColor: colorShades.gold.light,
      height: 5,
      justifyContent: "center",
    },
    textContainer: {
      width: 60,
      height: 60,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorShades.gold.base,
      position: "absolute",
      top: -layout.knobSize,
    },
    ballon: {
      alignItems: "center",
      justifyContent: "center",
      width: 4,
      height: layout.indicatorSize,
      bottom: -layout.knobSize / 2,
      borderRadius: 2,
      backgroundColor: colorShades.gold.base,
      position: "absolute",
    },
    progress: {
      height: 5,
      backgroundColor: colorShades.gold.dark,
      position: "absolute",
    },
  });
  