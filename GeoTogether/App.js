import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Home from './src';

export default class App extends Component {
  render() {
    return <Home />
  }
}

AppRegistry.registerComponent('App', () => App);
