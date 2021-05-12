import React from 'react';
import { StyleSheet, ScrollView, Text, ViewStyle } from 'react-native';

type Style = {
  mainContainer: ViewStyle,
}

const About = (): JSX.Element => {
  return (
    <ScrollView style={styles.mainContainer}>
      <Text>About</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create<Style>({
  mainContainer: {
    flex: 1,
    width: '90%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default About;