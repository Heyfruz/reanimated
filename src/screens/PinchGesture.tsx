import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface PinchGestureProps {}
const uri = 'https://source.unsplash.com/NJ8Z8Y_xUKc';

function PinchGesture({}: PinchGestureProps): JSX.Element | null {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const focalPointStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  }));

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: +width / 2 },
      { translateY: +height / 2 },
    ],
  }));

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={styles.container}>
        <AnimatedImage
          style={[{ flex: 1, resizeMode: 'cover' }, reanimatedStyle]}
          source={{ uri }}
        />
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

export default PinchGesture;
