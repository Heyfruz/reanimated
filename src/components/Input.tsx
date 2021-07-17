import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface InputProps {
  onChange?: () => void;
  value?: string;
}

function Input({ onChange, value }: InputProps): JSX.Element | null {
  return (
    <View style={styles.container}>
      <TextInput value={value} onChange={onChange} editable={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Input;
