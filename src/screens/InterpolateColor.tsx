import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    backgroundColor: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    backgroundColor: '#F8F8F8',
    circle: '#FFFFFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: '#33333350',
  false: '#00000010',
};

const SIZE = Dimensions.get('screen').width * 0.7;

type Theme = 'Light' | 'Dark';

function InterpolateColor(): JSX.Element | null {
  const [theme, setTheme] = useState<Theme>('Light');
  const progress = useDerivedValue(() => {
    return theme === 'Dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.backgroundColor, Colors.dark.backgroundColor],
    );

    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );

    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );

    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'Dark'}
          onValueChange={toggled => {
            setTheme(toggled ? 'Dark' : 'Light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={theme === 'Light' ? '#FFF' : '#333333'}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 14,
    marginBottom: 25,
  },
});

export default InterpolateColor;
