import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Pressable } from 'react-native';

type ButtonProps = {
  title: string,
  onPress: () => void,
}

type Style = {
  buttonView: ViewStyle,
  buttonText: TextStyle,
  mainContainer: ViewStyle
}

const CustomButton = (props: ButtonProps): JSX.Element => {
  const { title, onPress } = props;
  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={onPress}
        style={styles.buttonView}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  buttonView: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#008080',
  },
  buttonText: { color: '#eee', textAlign: 'center', fontSize: 15 },
  mainContainer: { width: '100%', marginTop: 10 }
});

export default CustomButton;