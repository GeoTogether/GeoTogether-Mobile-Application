import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default class AppForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />

        <TextInput
          placeholder="password"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          />

        <Text style={styles.splitText}>Forgot Your Password?</Text>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: -10,
    marginBottom: 20,
    marginTop: 20
  },

  input: {
    height: 50,
    width: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    paddingHorizontal: 10
  },

  buttonContainer: {
    backgroundColor: 'rgb(0,25,88)',
    paddingVertical: 15
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  
  splitText: {
    textAlign: 'center',
    color: 'rgb(0,25,88)',
    fontWeight: '700',
    marginTop: -10,
    marginBottom: 10
  },
});
