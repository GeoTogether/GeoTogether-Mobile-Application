import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ToolbarAndroid, StyleSheet, Image, View } from 'react-native';




export default class ProfileSettings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/face.png')} style={styles.image}/>
                <Text style={styles.change}>Change Photo </Text>

                <Text style={styles.labels}>Name</Text>
                <TextInput style={styles.input}>
                    John Doe
                </TextInput>
                <Text style={styles.labels}>Username</Text>
                <TextInput style={styles.input}>
                    jdoe3
                </TextInput>
                <Text style={styles.labels}>Email</Text>
                <TextInput style={styles.input2}>
                    john.doe@gmail.com
                </TextInput>
                <Text style={styles.labels}>Gender</Text>
                <TextInput style={styles.input}>
                    Male
                </TextInput>
            </View>


        );



    }
}

const styles = StyleSheet.create({
    toolbar: {
        height:50,
        backgroundColor: 'white',
    },
    image: {
        marginLeft: 160,


    },
    change: {
        color: 'blue',
        textAlign: 'center',
    },
    input: {
        marginRight: 260,

    },
    input2: {
        marginRight: 200,
    },
    labels: {
        color: 'grey',
        marginLeft: 20,
    },
    container: {
        flex: 1,
        marginTop: 15,

        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
