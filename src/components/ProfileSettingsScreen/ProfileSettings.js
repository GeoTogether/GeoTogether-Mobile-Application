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
        photo: '',
        fname: '',
        lname: '',
        ImageSource: null,
        photoS: null,
    }

    constructor(props) {
        super(props)
    }


    // componentWillMount() {
    //
    //     const { state } = this.props.navigation;
    //     this.setState({ email: state.params.email });
    //
    //
    //     // get all the users from the firebase database
    //     firebase.database().ref("users").on('value', (snapshot) => {
    //         snapshot.forEach((userSnapshot) => {
    //
    //
    //             const val = userSnapshot.val();
    //
    //
    //             if (val.email == this.state.email) {
    //
    //
    //                 this.setState({ fname: val.first });
    //                 this.setState({ lname: val.last });
    //                 this.setState({ photo: val.photo })
    //
    //
    //
    //
    //                 if (this.state.photo == '') {
    //
    //
    //                    // this.setState({ photoS: require('../../images/face.png') })
    //
    //                 } else {
    //
    //                     this.setState({ photoS: { uri: this.state.photo } })
    //                 }
    //
    //
    //
    //             }
    //
    //         })
    //     })
    //
    //
    //
    // }
    //
    //
    //
    // componentDidMount() {
    //     const { state } = this.props.navigation;
    //     this.setState({ email: state.params.email });
    //     // get all the users from the firebase database
    //     // get all the users from the firebase database
    //     firebase.database().ref("users").on('value', (snapshot) => {
    //         snapshot.forEach((userSnapshot) => {
    //
    //
    //             const val = userSnapshot.val();
    //
    //
    //             if (val.email == this.state.email) {
    //
    //
    //                 this.setState({ fname: val.first });
    //                 this.setState({ lname: val.last });
    //                 this.setState({ photo: val.photo })
    //
    //
    //
    //
    //     if (this.state.photo == '') {
    //
    //
    //                     //this.setState({ photoS: require('../../images/face.png') })
    //
    //                 } else {
    //
    //                     this.setState({ photoS: { uri: this.state.photo } })
    //                 }
    //
    //
    //
    //             }
    //
    //         })
    //     })
    //
    //
    //
    //
    //
    //
    //
    //
    // }

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
                        <Image
                            style={{width: 100, height: 100, marginLeft: 155}}
                            source={this.state.photoS}
                        />
                    )}
                </View>


                <View style={styles.profileInfoContainer}>

                    <View style={styles.displayHeader}>
                    <Text style={styles.labels}>Name</Text>
                    </View>
                    <TextInput style={styles.input}>
                        {this.state.fname} {this.state.lname}
                    </TextInput>

                    <View style={styles.displayHeader}>
                    <Text style={styles.labels}>Username</Text>
                    </View>
                    <TextInput style={styles.input}>
                        {this.state.fname}
                    </TextInput>

                    <View style={styles.displayHeader}>
                    <Text style={styles.labels}>Email</Text>
                    </View>
                    <TextInput style={styles.input2}>
                        {this.state.email}
                    </TextInput>

                    <View style={styles.displayHeader}>
                    <Text style={styles.labels}>Gender</Text>
                    </View>
                    <TextInput style={styles.input2}>
                        {this.state.email}
                    </TextInput>

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
    displayHeader:{
        paddingTop: 15
    },
    labels:{
        fontSize: 15
    }
});
