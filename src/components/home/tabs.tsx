import Constants from 'expo-constants';
import * as React from 'react';
import {
  FlatList,
  type LayoutRectangle,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  clamp,
  FadeInDown,
  interpolate,
  interpolateColor,
  LinearTransition,
  runOnUI,
  scrollTo,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';


function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function sleep(ms = 1000, value = true) {
  await timeout(ms);
  return value;
}

const Indicator = ({
  menuLayout,
  activeMenu,
  animationDuration = 300,
}: {
  menuLayout: MenuLayout;
  activeMenu: SharedValue<number>;
  animationDuration?: number;
}) => {
  const anim = useSharedValue(0);
  useAnimatedReaction(
    () => {
      return activeMenu.value;
    },
    (v, oldV) => {
      // This just mounted...
      console.log({ v, oldV });
      if (typeof oldV !== 'number') {
        return;
      }
      anim.value = 0;
      if (v > oldV) {
        anim.value = withDelay(0, withTiming(1, { duration: animationDuration }));
        // right
      } else {
        anim.value = withDelay(0, withTiming(-1, { duration: animationDuration }));
        // left
      }
    },
    [activeMenu],
  );
  const stylez = useAnimatedStyle(() => {
    const itemLayout = menuLayout[activeMenu.value]!;
    const newWidth = clamp(itemLayout.width - _spacing, 20, itemLayout?.width);
    return {
      position: 'absolute',
      left: itemLayout.x + itemLayout?.width / 2 - newWidth / 2,
      top: itemLayout.y + itemLayout.height + _spacing / 4,
      width: newWidth,
      transform: [
        {
          scaleX: interpolate(Math.abs(anim.value), [0, 0.5, 1], [1, 2.2, 1]),
        },
        {
          scaleY: interpolate(Math.abs(anim.value), [0, 0.5, 1], [1, 0.5, 1]),
        },
      ],
      backgroundColor: interpolateColor(Math.abs(anim.value), [0, 0.3, .7, 1], ['#333', '#999','#999', '#333'])
    };
  });

  return (
    // <Animated.View>
      <Animated.View
        layout={LinearTransition}
        entering={FadeInDown.duration(animationDuration)}
        style={[{ height: 4, width: 40, backgroundColor: '#333', borderRadius: 2 }, stylez]}
      />
    // </Animated.View>
  );
};


const mockedTabs = [
  'Favorites',
  'Hot',
  'Gainers',
  'Losers',
  'New Listings',
  '24h Vol',
  'Market Cap',
];

const _spacing = 30;

type MenuLayout = {
  [key: number]: LayoutRectangle;
};
type MenuProps = {
  menu: string[];
  onChange: (index: number) => void;
  initialIndex?: number;
  animationDuration?: number;
};


const Menu = React.memo(
  ({ menu, initialIndex = 0, onChange, animationDuration = 300 }: MenuProps) => {
    const _menuLayout = React.useRef<MenuLayout>({});
    const [isVisible, setIsVisible] = React.useState(false);
    const activeMenu = useSharedValue(0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const aRef = useAnimatedRef<Animated.ScrollView>();
    const { width } = useWindowDimensions();
    const scrollToIndex = React.useCallback(
      async (index: number, animated = true) => {
        await sleep(animationDuration / 2, true);
        activeMenu.value = index;
        runOnUI(scrollTo)(
          aRef,
          _menuLayout.current[index]!.x + _menuLayout.current[index]!.width / 2 - width / 2,
          0,
          animated,
        );
      },
      [initialIndex],
    );
    React.useEffect(() => {
      if (isVisible) {
        if (initialIndex > menu.length) {
          throw new Error('initialIndex out of range');
        }
        console.log(initialIndex);
        activeMenu.value = initialIndex;
        scrollToIndex(initialIndex, true);
      } else {
        activeMenu.value = initialIndex;
      }
    }, [initialIndex, isVisible, activeIndex]);
    return (
      <Animated.ScrollView ref={aRef} horizontal style={{ flexGrow: 0 }}
        contentContainerStyle={{paddingHorizontal: _spacing,paddingBottom: _spacing / 4 + 4,}} snapToAlignment='center' showsHorizontalScrollIndicator={false}>
        {menu.map((m, index) => {
          const newIndex = menu.indexOf(m);
          return (
            <TouchableOpacity key={m}
              onPress={async () => {
                if (newIndex === activeMenu.value) {
                  return;
                }
                activeMenu.value = newIndex;
                onChange(newIndex);
                setActiveIndex(index);
                await sleep(animationDuration / 2, true);
              }}
              style={{ marginRight: _spacing }}
              onLayout={(ev) => {
                _menuLayout.current[newIndex] = {
                  ...ev.nativeEvent.layout,
                };
                if (Object.keys(_menuLayout.current).length === menu.length && !isVisible) {
                  setIsVisible(true);
                }
              }}
            >
              <View><Text style={{color: activeIndex === index ? '#E9AE5F' : '#B5B5BF', fontSize:16, fontFamily:'Satoshi-Bold'}}>{m}</Text></View>
            </TouchableOpacity>
          );
        })}
        {isVisible && (
          <Indicator menuLayout={_menuLayout.current} activeMenu={activeMenu} animationDuration={animationDuration}/>
        )}

      </Animated.ScrollView>
    );
  },
);

export default function Tabs() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);
  return (
    <SafeAreaView style={styles.container}>
      <Menu
        menu={mockedTabs}
        initialIndex={activeIndex}
        animationDuration={300}
        onChange={(index) => {
          // do something
          console.log('index has changed: ', index);
          setActiveIndex(index);
          ref.current?.scrollToIndex({
            index,
            animated: true,
          });
        }}
      />
      <FlatList
        ref={ref}
        data={mockedTabs}
        horizontal
        pagingEnabled
        initialScrollIndex={activeIndex}
        onMomentumScrollEnd={(ev) => {
          setActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ index }) => {
          // console.log(item)
          return <View key={index} style={{ width}}>
            <Tab index={index}/>
            
          </View>
        }}
      />
    </SafeAreaView>
  );
}

const Tab = ({index}: {index: number}) => {
  if(index === 0){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 1){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 2){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 3){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 4){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 5){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
  if(index === 6){
    return (
      <View style={{height:'50%'}}>
        <Text>{index}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
