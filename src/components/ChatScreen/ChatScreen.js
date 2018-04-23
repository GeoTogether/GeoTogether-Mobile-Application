import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import React from 'react';
import { View, Platform, Text, StyleSheet, NativeAppEventEmitter, TouchableOpacity, Image, TextInput } from 'react-native';
import firebase from '../Firebase/firebaseStorage';
import CustomActions from '../Custom/CustomActions';
import { TabNavigator, } from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';
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
        AddUser: null,
        TripUsers: null,

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
        this.setState({ modalVisible: false });


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
        const { state } = this.props.navigation;

        if (!this.validateEmail(this.state.InviteEmail)) {
            alert("Please enter a valid email");
        } else {
            setTimeout(() => {
                SendSMS.send({
                    body: 'Hey there! I hope you can accept this invite to join this amazing trip.\n\n' + state.params.trip.tripName +
                        ' starts on the ' + state.params.trip.startDate + '\n\nPlease be sure to accept soon!' + '\n\nhttps://geotogetherapp.github.io/?trip=' + state.params.tripKey.key + '&email=' + this.state.InviteEmail,
                    successTypes: ['sent', 'queued']
                }, (completed, cancelled, error) => {

                    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

                })
            }, 1000);

            this.closeModal();

        }
    };



    validateEmail = (InviteEmail) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(InviteEmail);
    };


    handleEmail = () => {
        const { state } = this.props.navigation;

        if (!this.validateEmail(this.state.InviteEmail)) {
            alert("Please enter a valid email");
        } else {
            setTimeout(() => {
                Mailer.mail({
                    subject: 'Invitation to join ' + state.params.trip.tripName,
                    recipients: [this.state.InviteEmail],
                    body: '<b>Hey there! I hope you can accept this invite to join this amazing trip.\n\n</b>' + state.params.trip.tripName +
                        '<b> starts on the </b>' + state.params.trip.startDate + '<b>\n\nPlease be sure to accept soon!</b>' + '<b>\n\nhttps://geotogetherapp.github.io/?trip=' + state.params.tripKey.key + '&email=' + this.state.InviteEmail,
                    isHTML: true
                }, (error, event) => {

                })
            }, 1000);


            this.closeModal();

        }

    };

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    AddToTrip() {
        this.stat.AddUser = 1;
        this.openModal();
    }
    DeleteFromTrip() {
        this.stat.AddUser = null;
        this.openModal();
    }

    AddRender() {
        return <View>
            <TextInput
            placeholder=" New Member Email Address "
            underlineColorAndroid="transparent"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={InviteEmail => this.setState({ InviteEmail })}
            style={styles.emailStyle}
        />
            <TouchableOpacity onPress={this.sendText}>
                <Image source={require('../../images/sms.png')} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={this.handleEmail}>
                <Image source={require('../../images/email.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.closeModal()}>
                <Image source={require('../../images/cancel.png')} />
            </TouchableOpacity></View>;
    }

    DeleteRender() {
        const { state } = this.props.navigation;
        var Path = 'trips/' + state.params.tripKey.key + '/'

        var members = "";

        firebase.database().ref(Path).once('value', (snapshot) => { members = snapshot.val().members });

        var membersWithoutAdmin = [];
        var y = 0;
        for (x = 0; x < members.length; x++) {

            if (members[x] == state.params.email) {

            }
            else {
                membersWithoutAdmin[y] = members[x];
                y++;

            }


        }



        this.stat.TripUsers = membersWithoutAdmin;

    }

    DeleteUser(user) {
        const { state } = this.props.navigation;

        var Path = 'trips/' + state.params.tripKey.key + '/';
        var newMembers = [];

        firebase.database().ref(Path).once('value', (snapshot) => {


            var oldMembers = snapshot.val().members;
            var y = 0;
            for (x = 0; x < oldMembers.length; x++) {

                if (oldMembers[x] == user) {


                }
                else {
                    newMembers[y] = oldMembers[x];
                    y++;

                }
            }

        });

        firebase.database().ref('trips/' + state.params.tripKey.key + '/members').set(newMembers);


        //this.setState({ modalVisible: false });
        this.closeModal();


    }

    render() {
        const { state } = this.props.navigation;
        const { navigate } = this.props.navigation;
        var email = state.params.email;

        var barComp;

        var ModalContainer = "";
        var CancelButton = <View></View>;
        var DeleteText = <View></View>;

        if (this.stat.AddUser != null) {
            DeleteText = <View></View>;
            ModalContainer = this.AddRender();
            CancelButton = <View></View>;


        } else {


            this.DeleteRender();
            DeleteText = <Text style={styles.buttonText}>Please Select The User You Would Like To Delete From The Trip</Text>;
            ModalContainer = this.stat.TripUsers.map((type) =>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.DeleteUser(type)}>
                    <Text style={styles.buttonText}>{type}</Text>
                </TouchableOpacity>);

            CancelButton = <View><TouchableOpacity style={styles.buttonStyle} onPress={() => this.closeModal()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity></View>;


        }

        if (state.params.trip.admin == state.params.email) {
            barComp = <ActionBar
                containerStyle={styles.bar}
                title={state.params.trip.tripName}
                titleStyle={styles.title}
                backgroundColor={'white'}
                iconImageStyle={{ tintColor: "black" }}
                leftIconName={'back'}
                onLeftPress={() => navigate('Chat', { email: state.params.email })}
                rightIcons={[
                    {
                        name: 'plus',
                        onPress: () => this.AddToTrip(),
                    },
                    {
                        name: 'star',
                        onPress: () => this.DeleteFromTrip(),
                    },
                ]}
            />


        } else {

            barComp = <ActionBar
                containerStyle={styles.bar}
                title={state.params.trip.tripName}
                titleStyle={styles.title}
                backgroundColor={'white'}
                iconImageStyle={{ tintColor: "black" }}
                leftIconName={'back'}
                onLeftPress={() => navigate('Chat', { email: state.params.email })}
            />

        }


        return (
            <View style={{ flex: 1 }}>

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



                                {DeleteText}
                                {ModalContainer}
                                {CancelButton}



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
    innerContainer: {
        backgroundColor: "#b4b4b4",
        padding: 20,
        borderRadius: 4,
        borderColor: "#ffa53f"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 350
    },
    emailStyle: {
        // alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        width: 225,
        height: 45,
    },
    buttonStyle: {
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
    },
});