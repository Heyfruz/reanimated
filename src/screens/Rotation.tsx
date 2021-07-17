import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

export const SIZE = 100.0;

function handleRotation(progress: Animated.SharedValue<number>): string {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
}

export default function App(): JSX.Element {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: SIZE,
            width: SIZE,
            backgroundColor: 'dodgerblue',
          },
          reanimatedStyle,
        ]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
