import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

class App extends React.Component {
  render() {
    return (

        <WebView
          source={{uri: 'http://192.168.2.85:3000'}}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    height: 50,
    width: 400,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
