import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Page } from '../components';

const WORDS = ['Sipping', 'on', 'straight', 'chlorine'];
const { width } = Dimensions.get('screen');

function Interpolate(): JSX.Element | null {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      horizontal
      snapToInterval={width}
      decelerationRate="fast"
      bounces={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {WORDS.map((title, index) => (
        <Page
          key={index.toString()}
          title={title}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  card: {},
});

export default Interpolate;
