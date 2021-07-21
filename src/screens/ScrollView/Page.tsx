import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
export const PAGE_WIDTH = Dimensions.get('window').width;

interface PageProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

function Page({ index, title, translateX }: PageProps): JSX.Element | null {
  const pageOffset = PAGE_WIDTH * index;

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + pageOffset }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: `#ff0000${index + 2}0` },
        reanimatedStyle,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

export default Page;
