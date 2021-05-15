import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, ViewStyle, TextInput, TextStyle, ToastAndroid, Linking, TouchableOpacity, Platform, Share } from 'react-native';
import Clipboard from 'expo-clipboard';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants"

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { randDateEpoch } from '../utils/randDateEpoch';
import { validate, Validatable } from '../utils/validation';

type Style = {
  mainContainer: ViewStyle,
  cardContent: ViewStyle,
  mainTextStyle: TextStyle,
  subTextStyle: TextStyle,
  inputContainer: ViewStyle,
  inputContent: TextStyle,
  pickerButtonStyle: TextStyle,
}

const Main = (): JSX.Element => {
  const [dt, setDt] = useState<Date>(new Date());
  const [datePickerVal, setDatePickerVal] = useState<Date | undefined>(undefined);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    let epochTimer = setInterval(() => {
      setDt(new Date())
    }, 1)
    return () => clearInterval(epochTimer);
  }, []);

  function generateRandomTimeHandler(start?: Date, end?: Date): void {
    const randTime = randDateEpoch(start, end);
    setDatePickerVal(randTime.randDate);
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
    const epochInputValidatable: Validatable = {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      value: +text,
    }
    if (!validate(epochInputValidatable)) {
      setErr(true);
    }
    else {
      if (text) {
        setDatePickerVal(new Date(+text));
      }
      else setDatePickerVal(undefined);
      setErr(false);
    }
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
      <Card title="Epoch Converter">
        <Fragment>
          <View style={styles.cardContent}>
            <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
              <TextInput style={styles.inputContent} placeholder="Enter Epoch Value" keyboardType="numeric" value={datePickerVal?.getTime().toString()} maxLength={15} onChangeText={epochInputChangeHandler}></TextInput>
              {datePickerVal && <TouchableOpacity onPress={() => setDatePickerVal(undefined)}><View style={{ alignItems: 'center' }}><MaterialIcons name='clear' size={25} color='#7f8c8d' /></View></TouchableOpacity>}
            </View>
            <View style={{ height: 10 }}></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={styles.pickerButtonStyle}>{datePickerVal ? datePickerVal.toDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: 10 }}></View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TouchableOpacity onPress={showTimepicker}>
                  <Text style={styles.pickerButtonStyle}>{datePickerVal ? datePickerVal.toTimeString() : 'Select Time'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {err && <Text>Please enter a valid number</Text>}
            <View style={{ flexDirection: 'row' }}>
              <CustomButton onPress={() => generateRandomTimeHandler()} icon='autorenew' iconStyle={{}} title="RANDOM" />
              {datePickerVal && <Fragment><View style={{ width: 5 }}></View><CustomButton buttonContainerStyle={{ flex: 0.20 }} buttonStyle={{ backgroundColor: '#ecf0f1' }} iconStyle={{ color: '#000' }} onPress={() => {
                Clipboard.setString(datePickerVal.getTime().toString());
                ToastAndroid.showWithGravity(
                  'Copied epoch to clipboard!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                );
              }} icon="content-copy" /></Fragment>}
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
              <CustomButton onPress={() => {}} icon='share' buttonContainerStyle={{flex: 1}} buttonStyle={{backgroundColor: '#651FFF'}} title="Share" />
              <View style={{ width: 5 }}></View>
              <CustomButton onPress={() => {}} icon='cake' buttonContainerStyle={{flex: 2}} buttonStyle={{backgroundColor: '#d50000'}} title="Wish Birthday" />
            </View> */}
          </View>
        </Fragment>
      </Card>
      <View style={[styles.cardContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
        <Text onPress={() => {
          Linking.openURL(
            'mailto:kbcsupervoid@gmail.com?subject=Feedback for Epoch'
          )
        }} style={{ color: '#651FFF', fontWeight: 'bold' }}>CONTACT</Text>
        <View style={{ width: 25, alignItems: 'center' }}><Text>|</Text></View>
        <Text onPress={() => {
          Linking.openURL(
            'https://play.google.com/store/search?q=pub:SuperVoid&c=apps',
          )
        }} style={{ color: '#651FFF', fontWeight: 'bold' }}>MORE APPS</Text>
        <View style={{ width: 25, alignItems: 'center' }}><Text>|</Text></View>
        <Text onPress={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.supervoid.epoch',
          )
        }} style={{ color: '#651FFF', fontWeight: 'bold' }}>REVIEW</Text>
        <View style={{ width: 25, alignItems: 'center' }}><Text>|</Text></View>
        <Text onPress={() => {
          Share.share({
            title: 'No Relapse',
            message: 'Hey, check out this Epoch app, it is super cool and ad-free! Download here https://play.google.com/store/apps/details?id=com.supervoid.epoch'
          })
        }} style={{ color: '#651FFF', fontWeight: 'bold' }}>SHARE</Text>
      </View>
      <View style={[styles.cardContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
        <Text style={{ color: '#999' }}>Created by SuperVoid</Text>
        <View style={{ width: 25, alignItems: 'center' }}><Text>|</Text></View>
        <Text style={{ color: '#999' }}>v{Constants.manifest.version}</Text>
      </View>
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
    width: '100%',
    justifyContent: 'center'
  },
  inputContent: {
    fontSize: 25,
    textAlign: 'center',
    color: '#000000'
  },
  pickerButtonStyle: {
    fontSize: 14, textAlign: 'center', color: '#7f8c8d'
  }
});

export default Main;