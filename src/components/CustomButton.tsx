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
  iconStyle?: TextStyle,
}

interface IButtonWithTitle extends IButtonBasicProps {
  title: string;
  textStyle?: TextStyle;
}

interface IButtonWithIcon extends IButtonBasicProps {
  icon: string;
  iconStyle?: TextStyle;
}

type ButtonProps = IButtonWithTitle | IButtonWithIcon;

type Style = {
  buttonView: ViewStyle,
  buttonText: TextStyle,
  mainContainer: ViewStyle,
  buttonIcon: TextStyle,
}

const CustomButton = (props: ButtonProps): JSX.Element => {
  const { title, onPress, buttonContainerStyle, textStyle, buttonStyle, icon, iconStyle } = props;

  return (
    <View style={{ ...styles.mainContainer, ...buttonContainerStyle }}>
      <Pressable
        onPress={onPress}
        style={{ ...styles.buttonView, ...buttonStyle }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {title && <Text style={{ ...styles.buttonText, ...textStyle }}>{title}</Text>}
          {icon && <><View style={{ width: 3 }}></View><MaterialIcons style={{ ...styles.buttonIcon, ...iconStyle }} name={icon} /></>}
        </View>
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
    marginHorizontal: 0,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#eee', textAlign: 'center', fontSize: 15 },
  mainContainer: { flex: 1, marginTop: 10, minHeight: 50 },
  buttonIcon: { textAlign: 'center', color: '#eee', fontSize: 22 },
});

export default CustomButton;