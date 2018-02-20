import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, ToolbarAndroid, TouchableOpacity, StyleSheet, Image, Modal, View, Alert } from 'react-native';

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
        modalVisible: false,
    }

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

	updateInfo = () => {
		var userData;
        var tempEmail = this.state.email;
        var tempFname = this.state.fname;
        var tempLname = this.state.lname;

		var leadsRef = firebase.database().ref('users');

		leadsRef.on('value', function(snapshot) {

    	    snapshot.forEach(function(childSnapshot) {

              if(childSnapshot.child("email").val() == tempEmail){
                userData = childSnapshot.key;
              }
              else{
                
              }
              //userData = childSnapshot.val();
              //userData2 = childSnapshot.child("email").val();
              

    	    });
	});		
        //console.log(this.state.fname);
        //console.log(this.state.lname);
        //console.log(this.state.email);

        
            
        
            //var db = firebase.database();
            //db.ref("users/"+userData+"/first").set("brandons");
   }

   _handlePress(event) {
    let fname=this.state.fname;
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

                <Modal
                  visible={this.state.modalVisible}
                  animationType={'slide'}
                  onRequestClose={() => this.closeModal()}
                >

                <View style={styles.modalContainer}>
                  <View style={styles.innerContainer}>
                    <Text>Please Input Which Users You Want To Add Below</Text>
                    <TextInput
                      style={{height: 40}}
                      defaultValue={this.state.email}
                      placeholder="Email Address:"
                      onChangeText={(UserInvite) => this.setState({UserInvite})}
                    />

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.showAlert()}>
                    <Text style={styles.buttonText}>Invite User</Text>
                  </TouchableOpacity>
                    
                      </View>
                    </View>
                </Modal>


                <Image
                    style={{ width: 100, height: 100, marginLeft: 155 }}
                    source={this.state.photoS}
                />
                <Text style={styles.change}>Change Photo </Text>

                <Text style={styles.labels}>First Name</Text>
                <TextInput style={styles.input}>
                    {this.state.fname}
                </TextInput>

                 <Text style={styles.labels}>Last Name</Text>
                <TextInput style={styles.input}>
                    {this.state.lname}
                </TextInput>

                <Text style={styles.labels}>Email</Text>
                <TextInput style={styles.input2}>
                    {this.state.email}
                </TextInput>

                <TouchableOpacity onPress={() => this.openModal()} style={styles.buttonContainer} >
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
