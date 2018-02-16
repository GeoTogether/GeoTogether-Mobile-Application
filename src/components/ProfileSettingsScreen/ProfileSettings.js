import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ToolbarAndroid, StyleSheet, Image, View } from 'react-native';

import firebase from '../Firebase/firebaseStorage';


export default class ProfileSettings extends Component {



    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'ProfileSettings',
        header: null
    }

    state = {
        email: '',
        photo: '',
        fname: '',
        lname: '',
        photoS: null,
    }


    componentWillMount() {

        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });


        // get all the users from the firebase database
        firebase.database().ref("users").on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {


                const val = userSnapshot.val();


                if (val.email == this.state.email) {


                    this.setState({ fname: val.first });
                    this.setState({ lname: val.last });
                    this.setState({ photo: val.photo })




                    if (this.state.photo == '') {


                        this.setState({ photoS: require('../../images/face.png') })

                    } else {

                        this.setState({ photoS: { uri: this.state.photo } })
                    }



                }

            })
        })



    }



    componentDidMount() {
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        // get all the users from the firebase database
        // get all the users from the firebase database
        firebase.database().ref("users").on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {


                const val = userSnapshot.val();


                if (val.email == this.state.email) {


                    this.setState({ fname: val.first });
                    this.setState({ lname: val.last });
                    this.setState({ photo: val.photo })




        if (this.state.photo == '') {
            
            
                        this.setState({ photoS: require('../../images/face.png') })
            
                    } else {
            
                        this.setState({ photoS: { uri: this.state.photo } })
                    }
            


                }

            })
        })








    }



    render() {


        return (
            <View style={styles.container}>

                <Image
                    style={{ width: 100, height: 100, marginLeft: 155 }}
                    source={this.state.photoS}
                />
                <Text style={styles.change}>Change Photo </Text>

                <Text style={styles.labels}>Name</Text>
                <TextInput style={styles.input}>
                    {this.state.fname} {this.state.lname}
                </TextInput>
                <Text style={styles.labels}>Username</Text>
                <TextInput style={styles.input}>
                    {this.state.fname}
                </TextInput>
                <Text style={styles.labels}>Email</Text>
                <TextInput style={styles.input2}>
                    {this.state.email}
                </TextInput>

            </View>


        );



    }
}

const styles = StyleSheet.create({

    toolbar: {
        height: 50,
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
