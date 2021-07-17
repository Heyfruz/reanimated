import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');
const SIZE = width * 0.7;

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

function Page({ index, title, translateX }: PageProps): JSX.Element | null {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return { borderRadius, transform: [{ scale }] };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: `#0000FF${index + 2}0` }]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#1E90FF50',
  },
  text: {
    fontSize: 70,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default Page;
