import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SubslideProps {
  description: string;
  subtitle: string;
}

function Subslide({
  description,
  subtitle,
}: SubslideProps): JSX.Element | null {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});

export default Subslide;
