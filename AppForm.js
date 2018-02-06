import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';


export default class AppForm extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

        <Text style={styles.title}>Home</Text>

        <TouchableOpacity style={styles.tripContainer}>
          <Text style={styles.tripName}>Spring Break 2018</Text>
          <Text style={styles.status}>(Open)</Text>
          <Text style={styles.date}>3/4/18 - 3/11/18</Text>
          <Text style={styles.members}>Members: 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tripContainer}>
          <Text style={styles.tripName}>West Coast Trip</Text>
          <Text style={styles.status}>(Closed)</Text>
          <Text style={styles.date}>1/4/18 - 2/4/18</Text>
          <Text style={styles.members}>Members: 5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tripContainer}>
          <Text style={styles.tripName}>Phoenix</Text>
          <Text style={styles.status}>(Closed)</Text>
          <Text style={styles.date}>12/4/17 - 12/11/17</Text>
          <Text style={styles.members}>Members: 4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tripContainer}>
          <Text style={styles.tripName}>New Jersey</Text>
          <Text style={styles.status}>(Closed)</Text>
          <Text style={styles.date}>11/17/17 - 12/1/17</Text>
          <Text style={styles.members}>Members: 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>NEW TRIP</Text>
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

  altLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50
  },

  tripContainer: {
    backgroundColor: '#fff',
    padding: 5,
    height: 125,
    width: 350,
    borderRadius: 10,
    marginBottom: 20
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

  splitContainer: {
    marginBottom: 20,
  },

  tripName: {
    textAlign: 'left',
    padding: 5,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },

  status: {
    padding: 5,
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },

  date: {
    padding: 5,
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },

  members: {
    padding: 5,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },

  title: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: -10,
    marginBottom: 20
  },
});
