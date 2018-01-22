import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AppForm from './AppForm';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('C:/ASU/S18/SER 402/workspace/geotogether-login/src/images/geotogether.png')}/>
        </View>

        <View style={styles.formContainer}>
          <AppForm />
        </View>

        <View style={styles.splitContainer}>
          <Text style={styles.splitText}>________________________    OR    ________________________</Text>
        </View>

        <View style={styles.altLoginContainer}>
          <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('C:/ASU/S18/SER 402/workspace/geotogether-login/src/images/facebook.png')}
            />
          </TouchableOpacity>
          <Text>                  </Text>

          <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('C:/ASU/S18/SER 402/workspace/geotogether-login/src/images/google.png')}/>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa53f',
  },

  altLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50
  },

  splitContainer: {
    marginBottom: 20,
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

  logo: {
    marginTop: 20,
    width: 300,
    height: 300
  },

  icon: {
    width: 75,
    height: 75
  },

  linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 2
  },
});
