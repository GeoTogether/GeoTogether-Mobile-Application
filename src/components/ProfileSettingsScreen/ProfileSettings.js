import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, PixelRatio, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import firebase from '../Firebase/firebaseStorage';
import ImagePicker from 'react-native-image-picker';


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
        previousEmail: '',
        photo: '',
        fname: '',
        lname: '',
        ImageSource: null,
        photoS: null,
    }

    updateInfo = () => {
        var userData;
        var db = firebase.database();
        tempEmail = this.state.previousEmail;
        currentEmail = this.state.email;

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
            
                if(this.state.email == this.state.previousEmail){
                    //changing names
                    db.ref("users/"+userData+"/first").set(this.state.fname);
                    db.ref("users/"+userData+"/last").set(this.state.lname);
                }
                else{
                    //chaning authorization and names and trips
                    var user = firebase.auth().currentUser;
                    console.log("here");
                    db.ref("users/"+userData+"/email").set(this.state.email);
                    db.ref("users/"+userData+"/first").set(this.state.fname);
                    db.ref("users/"+userData+"/last").set(this.state.lname);
                    user.updateEmail(this.state.email).then(function() {

                    }).catch(function(error) {
                       
                    });

                    var leadsRef2 = firebase.database().ref('trips');

                    leadsRef2.on('value', function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {

                          if(childSnapshot.child("admin").val() == tempEmail){
                            db.ref("trips/"+childSnapshot.key+"/admin").set(currentEmail);

                          }
                          else{
                            
                          }
                          
                          

                        });
                });

                }



                this.setState({ previousEmail: this.state.email });

            
    
            

            
            
   }


    componentWillMount() {

        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        this.setState({ previousEmail: state.params.email });


        // get all the users from the firebase database
        firebase.database().ref("users").on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {


                const val = userSnapshot.val();


                if (val.email == this.state.email) {


                    this.setState({ fname: val.first });
                    this.setState({ lname: val.last });
                    this.setState({ photo: val.photo })




                    if (this.state.photo == '') {


                       // this.setState({ photoS: require('../../images/face.png') })

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
        this.setState({ previousEmail: state.params.email });
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
            
            
                        //this.setState({ photoS: require('../../images/face.png') })
            
                    } else {

                        this.setState({ photoS: { uri: this.state.photo } })
                    }
            


                }

            })
        })








    }


    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({

                    ImageSource: source

                });
            }
        });
    }



    render() {

        return (
            <View>
                {this.state.photoS == null ? (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>

                        <View style={styles.ImageContainer}>

                            {
                                this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }

                        </View>

                    </TouchableOpacity>
                ) : (
                    <Image
                        style={{ width: 100, height: 100, marginLeft: 155 }}
                        source={this.state.photoS}
                    />
                )}


                <Text style={styles.labels}>First Name</Text>
                <TextInput style={styles.input} defaultValue={this.state.fname}
                ref= {(el) => { this.fname = el; }}
                onChangeText={(fname) => this.setState({fname})}
                value={this.state.fname}>
                </TextInput>

                <Text style={styles.labels}>Last Name</Text>
                <TextInput style={styles.input} defaultValue={this.state.lname}
                ref= {(el) => { this.lname = el; }}
                onChangeText={(lname) => this.setState({lname})}
                value={this.state.lname}>
                </TextInput>

                <Text style={styles.labels}>Email</Text>
                <TextInput style={styles.input2} defaultValue={this.state.email}
                ref= {(el) => { this.email = el; }}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}>
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
    ImageContainer: {
        borderRadius: 75,
        width: 150,
        height: 150,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

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
});
