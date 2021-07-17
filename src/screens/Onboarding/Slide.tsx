import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

export const { height, width } = Dimensions.get('screen');
export const SLIDE_HEIGHT = height * 0.65;

interface SlideProps {
  title: string;
  image: number;
}

function Slide({ title, image }: SlideProps): JSX.Element | null {
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: width / 2 - 50 },
    { rotate: '-90deg' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
  },
  text: {
    fontSize: 72,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slide;
