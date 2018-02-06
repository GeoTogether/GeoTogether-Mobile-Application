import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';


export default class AppForm extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

        <Text style={styles.splitText}>Name of Trip</Text>
        <TextInput
          placeholder="ex. Spring Break 2018"
          returnKeyType="done"
          autoCapitalize="words"
          autoCorrect={true}
          style={styles.input}
          />

        <Text style={styles.splitText}>Duration</Text>
        <TextInput
          placeholder="Start Date"
          returnKeyType="done"
          style={styles.durationInput}
          />

        <TextInput
          placeholder="End Date"
          returnKeyType="done"
          style={styles.durationInput}
          />

        <Text style={styles.splitText}>Start Location</Text>
        <TextInput
          placeholder="ex. Tempe, AZ"
          returnKeyType="done"
          autoCapitalize="words"
          autoCorrect={true}
          style={styles.input}
          />

          <Text style={styles.splitText}>End Location</Text>
          <TextInput
            placeholder="ex. Tempe, AZ"
            returnKeyType="done"
            autoCapitalize="words"
            autoCorrect={true}
            style={styles.input}
            />

          <TouchableOpacity>
            <Text style={styles.splitText}>+ ADD EVENT</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.splitText}>+ ADD MEMBERS</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>CREATE TRIP</Text>
        </TouchableOpacity>


      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },

  input: {
    height: 50,
    width: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    paddingHorizontal: 10
  },

  durationInput: {
    height: 50,
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },

  altLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50
  },

  buttonContainer: {
    backgroundColor: 'rgb(0,25,88)',
    paddingVertical: 15
  },

  splitContainer: {
    marginBottom: 20,
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },

  splitText: {
    textAlign: 'left',
    color: 'rgb(0,25,88)',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: -10,
    marginBottom: 10
  },
});
