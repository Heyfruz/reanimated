import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Picker from './Picker';
import { COLORS, BACKGROUND_COLOR } from './colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.7;

function ColorPicker(): JSX.Element | null {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);
  const [color, setColor] = useState<string | number>('');

  const onColorChanged = useCallback((color: string | number) => {
    'worklet';
    pickedColor.value = color;
  }, []);

  const updateText = (color: string | number) => {
    setColor(color);
  };

  const reanimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: pickedColor.value,
  }));

  return (
    <>
      <Animated.View style={styles.header}>
        <Animated.View style={[styles.circle, reanimatedStyle]} />
      </Animated.View>
      <View style={styles.footer}>
        <Picker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    backgroundColor: 'red',
    borderRadius: CIRCLE_SIZE / 2,
  },
});

export default ColorPicker;
