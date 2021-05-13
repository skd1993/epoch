import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, ViewStyle, TextInput, TextStyle, ToastAndroid, Alert, TouchableOpacity, Platform } from 'react-native';
import Clipboard from 'expo-clipboard';
import DateTimePicker from '@react-native-community/datetimepicker';

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { randDateEpoch } from '../utils/randDateEpoch';

type Style = {
  mainContainer: ViewStyle,
  cardContent: ViewStyle,
  mainTextStyle: TextStyle,
  subTextStyle: TextStyle,
  inputContainer: ViewStyle,
  inputContent: TextStyle,
}

const Main = (): JSX.Element => {
  const [dt, setDt] = useState<Date>(new Date());
  const [randEpoch, setRandEpoch] = useState<Number>();
  const [datePickerVal, setDatePickerVal] = useState<Date|undefined>(undefined);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    let epochTimer = setInterval(() => {
      setDt(new Date())
    }, 1)
    return () => clearInterval(epochTimer);
  }, []);

  function generateRandomTimeHandler(start?: Date, end?: Date): void {
    const randTime = randDateEpoch(start, end);
    // Alert.alert(randTime.randDate.toString(), randTime.randEpoch.toString());
    setRandEpoch(randTime.randEpoch);
  }

  const onChange = (event: Event, selectedDate: Date): void => {
    const currentDate: Date = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setDatePickerVal(currentDate);
  };

  const showMode = (currentMode: 'time' | 'date'): void => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (): void => {
    showMode('date');
  };

  const showTimepicker = (): void => {
    showMode('time');
  };

  const RNDatePicker = (): JSX.Element =>
    <DateTimePicker
      testID="dateTimePicker"
      value={new Date()}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
      minimumDate={new Date(0)} // epoch start
    />

  const epochInputChangeHandler = (text: string): void => {
    setDatePickerVal(new Date(+text));
  }

  return (
    <ScrollView contentContainerStyle={styles.mainContainer} endFillColor="#fff" showsVerticalScrollIndicator={false}>
      {React.useMemo(() => {
        return (show && <RNDatePicker />)
      }, [show])}
      <Card title="Current Epoch">
        <View style={styles.cardContent}>
          <Text style={styles.mainTextStyle}>{dt.getTime()}</Text>
          <Text style={styles.subTextStyle}>{`(${dt.toString()})`}</Text>
        </View>
      </Card>
      <Card title="Random Epoch">
        <View style={styles.cardContent}>
          <Fragment>
            {randEpoch && (
              <Fragment>
                <Text style={styles.mainTextStyle}>{randEpoch}</Text>
                <Text style={styles.subTextStyle}>{`(${(new Date(+randEpoch)).toString()})`}</Text>
              </Fragment>
            )}
            <View style={{ flexDirection: 'row' }}>
              <CustomButton onPress={() => generateRandomTimeHandler()} title="GENERATE" />
              {randEpoch && <CustomButton buttonContainerStyle={{ flex: 0.20 }} buttonStyle={{ backgroundColor: '#ecf0f1' }} onPress={() => {
                Clipboard.setString(randEpoch.toString());
                ToastAndroid.showWithGravity(
                  'Copied random epoch to clipboard!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                );
              }} icon="content-copy" />}
            </View>
          </Fragment>
        </View>
      </Card>
      <Card title="Converter">
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputContent} placeholder="Enter Epoch Value" keyboardType="numeric" value={(datePickerVal! && datePickerVal.getTime()) > 0 ? datePickerVal!.getTime().toString() : undefined} onChangeText={epochInputChangeHandler}></TextInput>
          </View>
          <View style={{ height: 10 }}></View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <TouchableOpacity onPress={showDatepicker}>
                <Text style={[styles.inputContent, { textAlign: 'center' }]}>{datePickerVal ? datePickerVal.getDate() + '/' + (datePickerVal.getMonth()+1) + '/' + datePickerVal.getFullYear() : 'Select Date'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 10 }}></View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <TouchableOpacity onPress={showTimepicker}>
                <Text style={[styles.inputContent, { textAlign: 'center' }]}>{datePickerVal ? datePickerVal.getHours() + ':' + datePickerVal.getMinutes() + ':' + datePickerVal.getSeconds() : 'Select Time'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Text>{datePickerVal.getTime() === NaN ? 'Please enter a valid date' : datePickerVal.toString()}</Text>
          <Text>{datePickerVal.getTime()}</Text> */}
        </View>
      </Card>
      <Card title="Converter">
        <View>
          <TextInput></TextInput>
          <TextInput></TextInput>
        </View>
      </Card>
      <Card title="Converter">
        <View>
          <TextInput></TextInput>
          <TextInput></TextInput>
        </View>
      </Card>
    </ScrollView >
  )
}

const styles = StyleSheet.create<Style>({
  mainContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#fff'
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  mainTextStyle: {
    fontSize: 25,
    color: '#444',
    textAlign: 'center'
  },
  subTextStyle: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: '#ecf0f1',
    marginVertical: 0,
    padding: 15,
    borderRadius: 12,
    width: '100%'
  },
  inputContent: {
    fontSize: 18,
    textAlign: 'center'
  },
});

export default Main;