import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  state = {
    seconds: 1500,
  }

  componentDidMount() {
    this.timer = setInterval(this.decrementSec, 1000)
  }

  decrementSec = () => {
    this.setState(prevState => ({seconds: prevState.seconds - 1}))
  }

  render() {
    return <Text style={styles.text_block}>
              {~~(this.state.seconds / 60)}:{this.state.seconds % 60}
          </Text>
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text_block}>Work Timer</Text>
        <CountdownTimer />
      <StatusBar style="auto" />
      </View>
    );
  }
}

