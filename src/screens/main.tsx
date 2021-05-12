import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text, ViewStyle, TextStyle } from 'react-native';

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { randDateEpoch } from '../utils/randDateEpoch';

type Style = {
  mainContainer: ViewStyle,
  cardContent: ViewStyle,
  mainTextStyle: TextStyle,
  subTextStyle: TextStyle,
}

const Main = (): JSX.Element => {
  const [dt, setDt] = useState<Date>(new Date());
  const [randEpoch, setRandEpoch] = useState<Number>();

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

  return (
    <View style={styles.mainContainer}>
      <Card title="Current Epoch">
        <View style={styles.cardContent}>
          <Text style={styles.mainTextStyle}>{dt.getTime()}</Text>
          <Text style={styles.subTextStyle}>{`(${dt.toString()})`}</Text>
        </View>
      </Card>
      <Card title="Random Epoch">
        <View style={styles.cardContent}>
          <Fragment>
            {randEpoch && <Text style={styles.mainTextStyle}>{randEpoch}</Text>}
            <CustomButton onPress={() => generateRandomTimeHandler()} title="GENERATE" />
          </Fragment>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create<Style>({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#ffffff',
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
  }
});

export default Main;