import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';

import slides from './data';
import Paginator from './Paginator';
import Slide, { height, SLIDE_HEIGHT, width } from './Slide';
import Subslide from './Subslide';

function Onboarding(): JSX.Element | null {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const styleX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  const styleC = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      slides.map((_, i) => i * width),
      slides.map(slide => slide.colors),
    );
    return {
      backgroundColor,
    };
  });

  const styleD = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      slides.map((_, i) => i * width),
      slides.map(slide => slide.colors),
    );
    return {
      backgroundColor,
    };
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
          },
          styleD,
        ]}
      />
      <Animated.View style={[styles.slider]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}>
          {slides.map(({ title, image }, index) => {
            return <Slide key={index} title={title} image={image} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            styleC,
          ]}
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Paginator key={index} {...{ index, translateX }} />
          ))}
        </View>
        <Animated.View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              width: width * slides.length,
            },
            styleX,
          ]}>
          {slides.map(({ description, subtitle }, index) => (
            <Subslide key={index} {...{ description, subtitle }} />
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomLeftRadius: 80,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
  },
});

export default Onboarding;
