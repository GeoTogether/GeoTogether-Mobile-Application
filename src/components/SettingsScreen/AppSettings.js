import React from 'react';
import { AppRegistry, Image, TouchableHighlight, StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../Firebase/firebaseStorage';

export default class AppSettings extends React.Component {
  constructor(props) {
      super(props)
      this.state = { count: 0 }
    }

    static navigationOptions = {
        title: 'Settings',
        header: null
    }

    onPress = () => {
      this.setState({
        count: this.state.count+1
      })
    }
    
        // funcation to sign out using firebase authentication.

        onPressLogOut() {
          const { navigate } = this.props.navigation;
  
          if (firebase.auth().currentUser !== null) {
  
              firebase.auth().signOut()
                  .then(() => {
                      this.setState({
                          email: '',
                          password: '',
                          authenticating: false,
                          user: null,
                      })
                      navigate('SplashScreen') // after login go to trips
  
                  }, error => {
                      console.error('Sign Out Error', error);
                  });
          }
      }


   render() {
     const {goBack} = this.props.navigation;
      return (
        <View style={styles.container}>
        <View style={styles.headerTab}>
        <TouchableOpacity onPress={() => goBack()} style={styles.back} >
          <Image style={styles.icon}
            source={require('../../images/back.png')}/>
          </TouchableOpacity>

          <View style={styles.headingText}>
          <Text style={styles.heading}> APP SETTINGS </Text>
          </View>
        </View>


          <TouchableHighlight
           style={styles.button}
           onPress={this.onPress}
          >
           <Text style={{color: '#000'}}> Display & Sound </Text>
          </TouchableHighlight>

          <TouchableHighlight
           style={styles.button}
           onPress={this.onPress}
          >
           <Text style={{color: '#000'}}> Notifications </Text>
          </TouchableHighlight>
          <TouchableHighlight
           style={styles.button}
           onPress={this.onPress}
          >
           <Text style={{color: '#000'}}> Privacy & Safety </Text>
          </TouchableHighlight>
          <TouchableHighlight
           style={styles.button}
           onPress={this.onPress}
          >
           <Text style={{color: '#000'}}> About </Text>
          </TouchableHighlight>

             <TouchableHighlight
           style={styles.button}
           onPress={() => this.onPressLogOut()}
          >
           <Text style={{color: '#000'}}> Log Out </Text>
          </TouchableHighlight>

        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FE7C00'
    },
    button: {
      backgroundColor: '#FFF',
      padding: 12,
      color: '#000',
      borderRadius: 1,
      borderWidth: 0.5,
      borderColor: '#000'
    },
    headerTab: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      padding: 15,
      color: '#000',
      borderRadius: 1,
      borderWidth: 0.5,
      borderColor: '#000',
      //justifyContent: 'center',
      alignItems: 'center',
    },
    settingsTab: {
      backgroundColor: '#FFF',
      padding: 15,
      color: '#000',
      borderRadius: 1,
      borderWidth: 0.5,
      borderColor: '#000'
    },
    back: {
        marginLeft: -10,
        marginTop: 5,
    },
    heading: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: '5%',
        marginBottom: '5%',
        color: '#000'
    },
    icon: {
      transform: [{ rotate: '180deg' }],
      height: 30,
      width: 30,
      marginLeft: '2%',
    }
  });
