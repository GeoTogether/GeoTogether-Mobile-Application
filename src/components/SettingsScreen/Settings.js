import React from 'react';
import { AppRegistry, Image, TouchableHighlight, StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class Settings extends React.Component {
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

   render() {
      return (
        <View style={styles.container}>
        <View>
        <Text style={styles.heading}> Settings </Text>
            <TouchableOpacity onPress={() => goBack()} style={styles.back} >
                <Image source={require('../../images/backarrow.png')}/>
            </TouchableOpacity>
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
      padding: 10,
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
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: '5%',
        marginBottom: '5%',
        color: '#000'
    },
  });
