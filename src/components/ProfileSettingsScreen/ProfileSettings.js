import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, PixelRatio, TouchableOpacity, StyleSheet, Image, View} from 'react-native';

import firebase from '../Firebase/firebaseStorage';
import ImagePicker from 'react-native-image-picker';


export default class ProfileSettings extends Component {


    static navigationOptions = {
        title: 'ProfileSettings',
        header: null
    }

    // navigation options to be used to navigate the class from other classes
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

        leadsRef.on('value', function (snapshot) {

            snapshot.forEach(function (childSnapshot) {

                if (childSnapshot.child("email").val() == tempEmail) {
                    userData = childSnapshot.key;
                }
                else {

                }
                //userData = childSnapshot.val();
                //userData2 = childSnapshot.child("email").val();


            });
        });


        if (this.state.email == this.state.previousEmail) {
            console.log("1");
            //changing names
            db.ref("users/" + userData + "/first").set(this.state.fname);
            db.ref("users/" + userData + "/last").set(this.state.lname);
        }
        else {
            console.log("12");
            //chaning authorization and names and trips
            var user = firebase.auth().currentUser;
            db.ref("users/" + userData + "/email").set(this.state.email);
            db.ref("users/" + userData + "/first").set(this.state.fname);
            db.ref("users/" + userData + "/last").set(this.state.lname);
            user.updateEmail(this.state.email).then(function () {

            }).catch(function (error) {

            });

            var leadsRef2 = firebase.database().ref('trips');

            leadsRef2.on('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    if (childSnapshot.val().members.indexOf(tempEmail) != -1) {
                        var index = childSnapshot.val().members.indexOf(tempEmail);
                        db.ref("trips/" + childSnapshot.key + "/members/" + index + "").set(currentEmail);

                    }

                    if (childSnapshot.child("admin").val() == tempEmail) {
                        db.ref("trips/" + childSnapshot.key + "/admin").set(currentEmail);

                    }
                    else {

                    }


                });
            });

        }


        this.setState({previousEmail: this.state.email});


    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        

        const {state} = this.props.navigation;
        this.setState({email: state.params.email});
        this.setState({previousEmail: state.params.email});

        

        // get all the users from the firebase database
        firebase.database().ref("users").on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {
                

                const val = userSnapshot.val();
                

                
                if (val.email == this.state.email || ( val.email == state.params.email && (this.state.email =="") )) {

                    console.log("hello");
                    this.setState({fname: val.first});
                    this.setState({lname: val.last});
                    this.setState({photo: val.photo});

                    

                    




                    if (this.state.photo == '') {


                        this.setState({ photoS: require('../../images/face.png') })

                    } else {

                        this.setState({photoS: {uri: this.state.photo}})
                    }


                }

            })
        })


    }


    componentDidMount() {
        const {state} = this.props.navigation;
        this.setState({email: state.params.email});
        this.setState({previousEmail: state.params.email});
        // get all the users from the firebase database
        // get all the users from the firebase database
        firebase.database().ref("users").on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {


                const val = userSnapshot.val();


                if (val.email == this.state.email) {


                    this.setState({fname: val.first});
                    this.setState({lname: val.last});
                    this.setState({photo: val.photo})


                    if (this.state.photo == '') {


                        //this.setState({ photoS: require('../../images/face.png') })

                    } else {

                        this.setState({photoS: {uri: this.state.photo}})
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
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({

                    ImageSource: source

                });
            }
        });
    }

    // onPress={() => this.updateInfo()}

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {this.state.photoS == null ? (
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                            <View style={styles.imageComponent}>

                                {
                                    this.state.ImageSource === null ?
                                        <Text style={{color: 'blue'}}>Select a Photo</Text> :
                                        <Image source={this.state.ImageSource}/>
                                }

                            </View>

                        </TouchableOpacity>
                    ) : (
                    
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <Text style={{color: 'blue'}}>Select a Photo</Text>
                        </TouchableOpacity>
                        
                    )}
                </View>


                <View style={styles.profileInfoContainer}>

                    <View style={styles.displayHeader}>
                        <Text style={styles.labels}>First Name</Text>
                    </View>
                    <TextInput style={styles.input} defaultValue={this.state.fname}
                    ref= {(el) => { this.fname = el; }}
                    onChangeText={(fname) => this.setState({fname})}
                    value={this.state.fname}>
                    </TextInput>

                    <View style={styles.displayHeader}>
                        <Text style={styles.labels}>Last Name</Text>
                    </View>
                    <TextInput style={styles.input} defaultValue={this.state.lname}
                    ref= {(el) => { this.lname = el; }}
                    onChangeText={(lname) => this.setState({lname})}
                    value={this.state.lname}>
                    </TextInput>

                    <View style={styles.displayHeader}>
                        <Text style={styles.labels}>Email</Text>
                    </View>

                    <TextInput style={styles.input2} defaultValue={this.state.email}
                    ref= {(el) => { this.email = el; }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}>
                    </TextInput>

                    <View style={styles.displayHeader}>
                        <Text style={styles.labels}>Gender</Text>
                    </View>
                    <TextInput style={styles.input2}>
                        Male
                    </TextInput>

                </View>

                <View style={styles.updateBContainer}>
                    <TouchableOpacity  style={styles.buttonContainer} onPress={() => this.updateInfo()}>
                        <Text style={styles.buttonText}>Update Profile Info</Text>
                    </TouchableOpacity>
                </View>

            </View>


        );


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        //backgroundColor: 'black',
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageComponent: {
        borderRadius: 75,
        width: 150,
        height: 150,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    profileInfoContainer: {
        flex: 3,
        //height: '50%',
        width: '80%',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingBottom: 100,
    },
    displayHeader: {
        paddingTop: 15
    },
    labels: {
        fontSize: 15
    },
    updateBContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        width: 300,
        height: 45,
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100'
    }
});
