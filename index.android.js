import React, { Component } from 'react';
import { Text, View, AppRegistry, StyleSheet, TouchableHighlight } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

class ReactNative_Stopwatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
    };

    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            { this.startStopButton() }
            { this.lapButton() }
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            I am a list of Laps
          </Text>
        </View>
      </View>
    );
  }

  startStopButton() {
    const style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight 
        underlayColor="gray" 
        onPress={this.handleStartPress} 
        style={[styles.button, style]}>
        <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    );
  }

  lapButton() {
    return (
      <TouchableHighlight style={styles.button}
        underlayColor="gray"
        onPress={this.handleLapPress}
      >
        <Text>Lap</Text>
      </TouchableHighlight>
    );
  }

  handleLapPress() {
    const lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]),
    });
  }
  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false,
      })
      return;
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(()=>{
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 50);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  }
});

AppRegistry.registerComponent('ReactNative_Stopwatch', () => ReactNative_Stopwatch)
