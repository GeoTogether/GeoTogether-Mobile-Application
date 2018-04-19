import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import React from 'react';
import {View, Platform, Text, StyleSheet, NativeAppEventEmitter, TouchableOpacity, Image} from 'react-native';
import firebase from '../Firebase/firebaseStorage';
import CustomActions from '../Custom/CustomActions';
import { TabNavigator, } from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';
import {RevMobManager} from 'react-native-revmob';
import Modal from "react-native-modal";
import Mailer from 'react-native-mail';
import SendSMS from 'react-native-sms';


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'ChatScreen',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = { messages: [] };
        //this.getImage = this.getImage.bind(this);
        this.onSend = this.onSend.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);

    }


    stat = {
        initialTimeStamps: [],
        firstTime: 0,
        arrayVal: 0,
        image_uri: null,
        
    }

    renderName = (props) => {
        const { user: self } = this.state
        const { user = {} } = props.currentMessage
        const { user: pUser = {} } = props.previousMessage
        const isSameUser = pUser._id === user._id
        //const isSelf = user._id === self._id
        //const shouldNotRenderName = isSameUser

        return (

            <Text>
                {user.name}
            </Text>
        )

    }

    renderBubble = (props) => {
        return (
            <View>
                {this.renderName(props)}
                <Bubble {...props} />
            </View>
        )
    }





    componentDidMount() {
        RevMobManager.hideBanner();
        const { state } = this.props.navigation;
        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/';
        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

        firebase.database().ref(Path).on('child_added', (snapshot) => {






            firebase.database().ref(Path2).once('value', (snapshot) => { q = snapshot.val(); });



            var TotalArray = snapshot.val();
            var Messages = [];




            for (var key in TotalArray) {

                var photo;
                var firstname;
                var lastname;
                var name;
                firebase.database().ref("users").on('value', (snapshot) => {
                    snapshot.forEach((userSnapshot) => {


                        const val = userSnapshot.val();


                        if (val.email == TotalArray[key][0]) {


                            photo = val.photo;
                            lastname = val.last;
                            firstname = val.first;

                            name = firstname + " " + lastname;

                        }

                    })
                })



                if (TotalArray[key][0] == state.params.email && TotalArray[key][2] == "7") {

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: "",
                        createdAt: TotalArray[key][3],
                        user: {
                            _id: 1,
                            name: name,
                            avatar: photo,
                        },
                        image: (TotalArray[key][1])
                    });
                }
                else if (TotalArray[key][0] != state.params.email && TotalArray[key][2] == "7") {

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: "",
                        createdAt: TotalArray[key][3],
                        user: {
                            _id: this.stat.arrayVal + 2,
                            name: name,
                            avatar: photo,
                        },
                        image: (TotalArray[key][1])
                    });
                }
                else if (TotalArray[key][0] == state.params.email) {

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: TotalArray[key][1],
                        createdAt: TotalArray[key][2],
                        user: {
                            _id: 1,
                            name: name,
                            avatar: photo,
                        },
                    });
                }
                else {

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: TotalArray[key][1],
                        createdAt: TotalArray[key][2],
                        user: {
                            _id: this.stat.arrayVal + 2,
                            name: name,
                            avatar: photo,
                        },
                    });
                }

                this.stat.arrayVal = this.stat.arrayVal + 1;




            }
            this.AddToGui(Messages.reverse());



        });















    }


    AddToGui(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });

    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    sendMessage(message) {

        const { state } = this.props.navigation;


        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

        var q;

        firebase.database().ref(Path2).once('value', (snapshot) => { q = snapshot.val(); });

        firebase.database().ref(Path2).set((q + 1));


        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/' + (q + 1);




        firebase.database().ref(Path).push({


            0: state.params.email,
            1: message,
            2: this.getCurrentTime(),

        });
    }

    addUserToGroupChat(name) {

        const { state } = this.props.navigation;

        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/users/';

        firebase.database().ref(Path).push({

            name,

        });

    }

    getCurrentTime() {
        var currentdate = new Date();
        return currentdate.getTime();
    }


    componentWillMount() {
        this.setState({modalVisible: false});


    }
    onSend(messages = []) {
        this.sendMessage(messages[0].text);
    }

    renderCustomActions(props) {
        // if (Platform.OS === 'ios') {
        //     return (
        //         <CustomActions
        //             {...props}
        //         />
        //     );
        // }
        const options = {
            'Send a photo': (props) => {
                this.selectPhoto();
            },
            'Cancel': () => { },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    uploadImage(uri, mime = 'image/jpg') {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const { state } = this.props.navigation;

        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            var path = 'images/' + this.getCurrentTime() + '/';
            const imageRef = firebase.storage().ref(path).child(uploadUri);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {

                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()

                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images'
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
                //let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                //this.setstat({

                //  ImageSource: source

                //});
                this.uploadImage(response.uri)
                    .then(url => {
                        this.setState({ image_uri: url })
                        const { state } = this.props.navigation;


                        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

                        var q;

                        firebase.database().ref(Path2).once('value', (snapshot) => { q = snapshot.val(); });

                        firebase.database().ref(Path2).set((q + 1));


                        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/' + (q + 1);



                        firebase.database().ref(Path).push({


                            0: state.params.email,
                            1: url,
                            2: 7,
                            3: this.getCurrentTime(),

                        });


                    })
                    .catch(error => console.log(error))
            }
        });
    }

    sendText = () => {
        SendSMS.send({
            body: 'Invitation to join ' + this.state.tripname + '\n\nHey there! I hope you can accept this invite to join this amazing trip.\n\n' +
            this.state.tripname + ' starts on the ' + this.state.startDate + '\n\nPlease be sure to accept soon!',
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {

            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

        });

        this.closeModal();
    };

    handleEmail = () => {
        Mailer.mail({
            subject: 'Invitation to join ' + this.state.tripname,
            body: '<b>Hey there! I hope you can accept this invite to join this amazing trip.\n\n</b>'+ this.state.tripname +
                    '<b> starts on the </b>' + this.state.startDate + '<b>\n\nPlease be sure to accept soon!</b>',
            isHTML: true
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                { cancelable: true }
            )
        });

        this.closeModal();

    };

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }


    render() {
        const { state } = this.props.navigation;
        const { navigate } = this.props.navigation;
        var email = state.params.email;

        var barComp;

        if(state.params.trip.admin == state.params.email){
            barComp = <ActionBar
            containerStyle={styles.bar}
            title={state.params.trip.tripName}
            titleStyle={styles.title}
            backgroundColor={'white'}
            iconImageStyle={{tintColor: "black"}}
            leftIconName={'back'}
            onLeftPress={() => navigate('Chat', { email: state.params.email })}
            rightIcons={[
                {
                    name: 'plus',
                    onPress: () => this.openModal()
                },
            ]}
        />


        }else{

           barComp = <ActionBar
            containerStyle={styles.bar}
            title={state.params.trip.tripName}
            titleStyle={styles.title}
            backgroundColor={'white'}
            iconImageStyle={{tintColor: "black"}}
            leftIconName={'back'}
            onLeftPress={() => navigate('Chat', { email: state.params.email })}
        />

        }


        return (
            <View style={{flex: 1}}>

               {barComp}


                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: 1,
                        name: email,
                    }}
                    renderActions={this.renderCustomActions}
                    //renderCustomView={this.renderCustomView}
                    renderBubble={this.renderBubble}

                />



          <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}>

                        <View style={styles.inviteContainer}>
                            <View style={styles.modalContainer}>
                                <View style={styles.innerContainer}>

                                    <TouchableOpacity onPress={this.sendText}>
                                        <Image source={require('../../images/sms.png')}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={this.handleEmail}>
                                        <Image source={require('../../images/email.png')}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.closeModal()}>
                                        <Image source={require('../../images/cancel.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

            </View>
           

        );
    }
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
    inviteContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});