import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AppForm from './AppForm';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.formContainer}>
          <AppForm />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffa53f',
  },

  altLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },



  splitText: {
    textAlign: 'center',
    color: 'rgb(0,25,88)',
    fontWeight: '700'
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },


  icon: {
    width: 75,
    height: 75
  },

});
