import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface PickerProps extends LinearGradientProps {
  maxWidth: number;
  onColorChanged?: (color: string | number) => void;
  updateText?: (text: string | number) => void;
}

function Picker({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChanged,
  updateText,
}: PickerProps): JSX.Element | null {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [color, setColor] = useState<number | string | undefined>(undefined);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), maxWidth - PICKER_SIZE);
  });

  const storeColor = useCallback((color: string | number) => {
    setColor(color);
  }, []);
  console.log(color);

  const onEnd = useCallback(() => {
    'worklet';
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);

  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd,
  });

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: adjustedTranslateX.value },
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const reanimatedPickerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      colors.map((_, index) => (index / colors.length) * maxWidth),
      colors,
    );

    onColorChanged?.(backgroundColor);
    runOnJS(storeColor)(backgroundColor);

    return {
      backgroundColor,
    };
  });

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateY.value = withSpring(-PICKER_SIZE);
        scale.value = withSpring(1.2);
        translateX.value = withTiming(event.absoluteX - PICKER_SIZE);
      },
      onEnd,
    });

  return (
    <>
      <Text
        style={{
          color: 'white',
        }}>
        {color}
      </Text>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={PanGestureEvent}>
            <Animated.View style={styles.container}>
              <LinearGradient colors={colors} {...{ start, end, style }} />
              <Animated.View style={[styles.picker, reanimatedStyle]}>
                <Animated.View
                  style={[styles.pickerIndicator, reanimatedPickerStyle]}
                />
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

const PICKER_SIZE = 45;
const PICKER_INDICATOR_SIZE = PICKER_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  picker: {
    position: 'absolute',
    backgroundColor: '#FFF',
    height: PICKER_SIZE,
    width: PICKER_SIZE,
    borderRadius: PICKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerIndicator: {
    width: PICKER_INDICATOR_SIZE,
    height: PICKER_INDICATOR_SIZE,
    borderRadius: PICKER_INDICATOR_SIZE / 2,
    borderWidth: 1,
    borderColor: '#00000003',
  },
});

export default Picker;
