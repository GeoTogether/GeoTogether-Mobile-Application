import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ToolbarAndroid, TouchableOpacity, StyleSheet, Image, View, Alert } from 'react-native';

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

	updateInfo = () => {
		var userData;
        var tempEmail = this.state.email;


		var leadsRef = firebase.database().ref('users');

		leadsRef.on('value', function(snapshot) {

    	    snapshot.forEach(function(childSnapshot) {

              if(childSnapshot.child("email").val() == tempEmail){
                userData = childSnapshot.key;
                console.log(childSnapshot.child("last").val());
              }
              else{
                
              }
              //userData = childSnapshot.val();
              //userData2 = childSnapshot.child("email").val();
              

    	    });
	});		
        

        
      
        var db = firebase.database();
        db.ref("users/-L5lcL9mih33OvTNcPQ_/last").set("leidds");

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
                <TouchableOpacity onPress={() => this.updateInfo()} style={styles.buttonContainer} >
		            <Text style={styles.buttonText}>Update Profile Info</Text>
		        </TouchableOpacity>
		        

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
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
	  },
	  buttonContainer: {
	      backgroundColor: 'rgb(0,25,88)',
	      paddingVertical: 15,
	      paddingHorizontal: 1
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
