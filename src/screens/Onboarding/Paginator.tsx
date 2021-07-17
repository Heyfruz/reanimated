import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

import slides from './data';
import { width } from './Slide';

interface PaginatorProps {
  index: number;
  translateX: Animated.SharedValue<number>;
}

function Paginator({ index, translateX }: PaginatorProps): JSX.Element | null {
  const reanimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    const backgroundColor = interpolateColor(
      translateX.value,
      slides.map((_, i) => i * width),
      slides
        .slice(0)
        .reverse()
        .map(slide => slide.colors),
    );

    const dotWidth = interpolate(
      translateX.value,
      inputRange,
      [8, 12, 8],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale }],
      width: dotWidth,
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.container, reanimatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ea2a4b',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
  },
});

export default Paginator;
