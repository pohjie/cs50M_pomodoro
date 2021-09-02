import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {sprintf} from 'sprintf-js'

import {vibrate} from './utils.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_block: {
    alignItems: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

class CountdownTimer extends React.Component {
  constructor() {
    super()
    this.state = {
      isWork: true,
      messageArr: ["Rest Timer", "Work Timer"],
      secondsArr: [300, 1500],
      message: "Work Timer",
      seconds: 1500,
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.decrementSec, 1000)
  }

  decrementSec = () => {
    if (this.state.seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
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

