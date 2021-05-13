import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IButtonBasicProps {
  onPress: () => void,
  buttonContainerStyle?: ViewStyle,
  textStyle?: TextStyle,
  buttonStyle?: ViewStyle
  icon?: string,
  title?: string,
}

interface IButtonWithTitle extends IButtonBasicProps {
  title: string;
}

interface IButtonWithIcon extends IButtonBasicProps {
  icon: string,
}

type ButtonProps = IButtonWithTitle | IButtonWithIcon;

type Style = {
  buttonView: ViewStyle,
  buttonText: TextStyle,
  mainContainer: ViewStyle
}

const CustomButton = (props: ButtonProps): JSX.Element => {
  const { title, onPress, buttonContainerStyle, textStyle, buttonStyle, icon } = props;

  return (
    <View style={{ ...styles.mainContainer, ...buttonContainerStyle }}>
      <Pressable
        onPress={onPress}
        style={{ ...styles.buttonView, ...buttonStyle }}
      >
        {title && <Text style={{ ...styles.buttonText, ...textStyle }}>{title}</Text>}
        {icon && <MaterialIcons style={{textAlign: 'center'}} name={icon} size={25} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  buttonView: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#eee', textAlign: 'center', fontSize: 15 },
  mainContainer: { flex: 1, marginTop: 10, minHeight: 50 },
});

export default CustomButton;