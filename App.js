import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import {sprintf} from 'sprintf-js'

import {vibrate} from './utils.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text_block: {
    alignItems: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  text_body: {
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    margin: 8,
  },
  text_body_bold: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginRight: 2,
  },
});

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRunning: false,
      isWork: true,

      messageArr: ["Rest Timer", "Work Timer"],
      secondsArr: [300, 1500],

      message: "Work Timer",
      seconds: 1500,

      restMins: 5,
      restSecs: 0,
      workMins: 25,
      workSecs: 0,
    }
  }

  // timer
  startRunning = () => this.setState(() => ({
    isRunning: true,
  }))

  stopRunning = () => this.setState(() => ({
    isRunning: false,
  }))

  resetTimer = () => this.setState(prevState => ({
    seconds: prevState.secondsArr[Number(prevState.isWork)],
    isRunning: false,
  }))

  componentDidMount() {
    this.timer = setInterval(this.decrementSec, 1000)
  }

  decrementSec = () => {
    if (this.state.isRunning && this.state.seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  // input
  onChangeWorkMinutes = (mins) => {
    let newSecsArr = this.state.secondsArr.slice()
    newSecsArr[1] = mins*60 + this.state.workSecs

    this.setState(prevState => ({
      workMins: mins,
      secondsArr: newSecsArr,
    }))

    this.resetTimer()
  }

  onChangeWorkSecs = (secs) => {
    let newSecsArr = this.state.secondsArr.slice()
    newSecsArr[1] = this.state.workMins*60 + parseInt(secs, 10)

    this.setState(prevState => ({
      workSecs: secs,
      secondsArr: newSecsArr,
    }))

    this.resetTimer()
  }

  onChangeRestMinutes = (mins) => {
    let newSecsArr = this.state.secondsArr.slice()
    newSecsArr[0] = mins*60 + this.state.restSecs

    this.setState(prevState => ({
      restMins: mins,
      secondsArr: newSecsArr,
    }))

    this.resetTimer()
  }

  onChangeRestSecs = (secs) => {
    let newSecsArr = this.state.secondsArr.slice()
    newSecsArr[0] = this.state.restMins*60 + parseInt(secs, 10)

    this.setState(prevState => ({
      restSecs: secs,
      secondsArr: newSecsArr,
    }))

    if (!this.state.isWork) {
      this.resetTimer()
    }
  }

  render() {
    const minutesLeft = ~~(this.state.seconds / 60)
    const secondsLeft = this.state.seconds % 60

    const timeLeft = sprintf('%02d:%02d', minutesLeft, secondsLeft)
    const currMessage = this.state.message

    if (this.state.seconds == 0) {
      vibrate()
      this.state.isWork = !this.state.isWork
      this.state.message = this.state.messageArr[Number(this.state.isWork)]
      this.state.seconds = this.state.secondsArr[Number(this.state.isWork)]
    }

    return <View style={styles.container}>

            <Text style={styles.text_block}>{currMessage}</Text>
            <Text style={styles.text_block}>{timeLeft}</Text>
            <Button onPress={() => this.startRunning()} title="Start" />
            <Button onPress={() => this.stopRunning()} title="Stop" />
            <Button onPress={() => this.resetTimer()} title="Reset" />

            <View style={styles.row}>
              <Text style={styles.text_body_bold}>Work Time</Text>

              <Text style={styles.text_body}>Mins</Text>
              <TextInput
                style={styles.input}
                defaultValue="25"
                keyboardType="numeric"
                onEndEditing={mins => this.onChangeWorkMinutes(mins.nativeEvent.text)}
              />

              <Text style={styles.text_body}>Secs</Text>
              <TextInput
                style={styles.input}
                defaultValue="00"
                keyboardType="numeric"
                onEndEditing={secs => this.onChangeWorkSecs(secs.nativeEvent.text)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.text_body_bold}>Rest Time</Text>

              <Text style={styles.text_body}>Mins</Text>
              <TextInput
                style={styles.input}
                defaultValue="5"
                keyboardType="numeric"
                onEndEditing={mins => this.onChangeRestMinutes(mins.nativeEvent.text)}
              />

              <Text style={styles.text_body}>Secs</Text>
              <TextInput
                style={styles.input}
                defaultValue="00"
                keyboardType="numeric"
                onEndEditing={secs => this.onChangeRestSecs(secs.nativeEvent.text)}
              />
            </View>

           </View>
  }
}

export default class App extends React.Component {
  render() {
    return (
        <CountdownTimer />
    );
  }
}

