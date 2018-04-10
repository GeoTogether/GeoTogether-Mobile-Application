import { GiftedChat, Actions } from 'react-native-gifted-chat';
import React from 'react';
import { View, Platform, Text } from 'react-native';
import firebase from '../Firebase/firebaseStorage';
import CustomActions from '../Custom/CustomActions';
import CustomView from '../CustomView/CustomView';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';

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
        this.state = {messages: []};
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


    componentDidMount(){

        const {state} = this.props.navigation;
        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/';
        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

        firebase.database().ref(Path).on('child_added', (snapshot) => {






            firebase.database().ref(Path2).once('value', (snapshot) => {q = snapshot.val();});



            var TotalArray = snapshot.val();
            var Messages = [];


            for (var key in TotalArray) {

                if(TotalArray[key][0] == state.params.email && TotalArray[key][2] =="7"){

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: "",
                        createdAt: TotalArray[key][3],
                        user: {
                            _id: 1,
                            name: TotalArray[key][0],
                            avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                        },
                        image: (TotalArray[key][1])
                    });
                }
                else if(TotalArray[key][0] != state.params.email && TotalArray[key][2] =="7"){

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: "",
                        createdAt: TotalArray[key][3],
                        user: {
                            _id: this.stat.arrayVal+2,
                            name: TotalArray[key][0],
                            avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                        },
                        image: (TotalArray[key][1])
                    });
                }
                else if(TotalArray[key][0] == state.params.email){

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: TotalArray[key][1],
                        createdAt: TotalArray[key][2],
                        user: {
                            _id: 1,
                            name: TotalArray[key][0],
                            avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                        },
                    });
                }
                else{

                    Messages.push({
                        _id: this.stat.arrayVal,
                        text: TotalArray[key][1],
                        createdAt: TotalArray[key][2],
                        user: {
                            _id: this.stat.arrayVal+2,
                            name: TotalArray[key][0],
                            avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                        },
                    });
                }

                this.stat.arrayVal = this.stat.arrayVal +1;




            }
            this.AddToGui(Messages.reverse());



        });















    }


    AddToGui(messages = []){
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

    sendMessage(message){

        const {state} = this.props.navigation;


        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

        var q;

        firebase.database().ref(Path2).once('value', (snapshot) => {q = snapshot.val();});

        firebase.database().ref(Path2).set((q+1));


        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/' + (q+1);




        firebase.database().ref(Path).push({


            0: state.params.email,
            1: message,
            2: this.getCurrentTime(),

        });
    }

    addUserToGroupChat(name){

        const {state} = this.props.navigation;

        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/users/';

        firebase.database().ref(Path).push({

            name,

        });

    }

    getCurrentTime(){
        var currentdate = new Date();
        return currentdate.getTime();
    }


    componentWillMount() {



    }
    onSend(messages = []) {
        this.sendMessage(messages[0].text);
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Send a photo': (props) => {
                this.selectPhoto();
            },
            'Cancel': () => {},
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
        const {state} = this.props.navigation;

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
                    .then(url => {this.setState({image_uri: url})
                        const {state} = this.props.navigation;


                        var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';

                        var q;

                        firebase.database().ref(Path2).once('value', (snapshot) => {q = snapshot.val();});

                        firebase.database().ref(Path2).set((q+1));


                        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/' + (q+1);



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



    render() {
        const {state} = this.props.navigation;
        var email = state.params.email;
        return (

            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                    name: email,
                }}
                renderActions={this.renderCustomActions}
                renderCustomView={this.renderCustomView}

            />


        );
    }
}



//firebase.auth().currentUser.email user
//state.params.trip
/*
this is on the new trips screen now
        createGroupChat(){
        firebase.database().ref('trips/-L5q1pe515Q60z5TdwyG/chats/').push({
                    users:[
                    'hellos@gmail.com',
                    'x@gmail.com'
                    ],
                    messages:[
                    "GeoTogether",
                    "Welcome To The Beginning Of Your Chat",
                    "7:02",
                    ]
        });
    }
        */