import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// prop types
type CardProps = {
  children: JSX.Element
  title: string,
}

// style types
type Style = {
  container: ViewStyle;
  cardTitle: TextStyle;
};

const Card = (props: CardProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{props.title.trim()}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  container: {
    borderRadius: 20,
    elevation: 20,
    // borderColor: '#2e2e2e',
    // borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 25,
    // marginHorizontal: '5%',
    width: '90%',
    height: 'auto',
    minHeight: 100,
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default Card;