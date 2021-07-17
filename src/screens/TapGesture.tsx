import React, { useCallback, useRef } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const uri = 'https://source.unsplash.com/60GsdOMRFGc/1000x1000';
const heart =
  'https://raw.githubusercontent.com/enzomanuelmangano/animate-with-reanimated/main/05-double-tap-gesture-handler/assets/heart.png';

const AnimatedImage = Animated.createAnimatedComponent(Image);

function TapGesture(): JSX.Element | null {
  const scale = useSharedValue(0);
  const doubleTapRef = useRef();
  const opacity = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const reanimatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground source={{ uri }} style={styles.image}>
              <AnimatedImage
                source={{ uri: heart }}
                style={[styles.heart, reanimatedStyle]}
                resizeMode="center"
              />
            </ImageBackground>
            <Animated.Text style={[styles.turtle, reanimatedTextStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: width,
    width: width,
    justifyContent: 'center',
  },
  heart: {
    height: width / 5,
    width: width / 5,
    alignSelf: 'center',
  },
  turtle: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default TapGesture;
