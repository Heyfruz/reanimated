import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page, { PAGE_WIDTH } from './Page';

const titles = ['This', 'is', 'a', 'test'];

type ContextType = {
  x: number;
};

function CustomScroll(): JSX.Element | null {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
          {titles.map((title, index) => (
            <Page
              key={index}
              {...{ title, index, translateX: clampedTranslateX }}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomScroll;
