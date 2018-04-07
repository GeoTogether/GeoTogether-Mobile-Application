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
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    }


    stat = {
        initialTimeStamps: [],
        firstTime: 0,
        arrayVal: 0,
        image_uri: null,
    }

    forceUpdateHandler(){
    this.setState({firstTime: 0});
    this.forceUpdate();
  };


  componentDidMount(){

    const {state} = this.props.navigation;
    var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/';
    var Path2 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/number/';


    firebase.database().ref(Path).on('value', (snapshot) => {




        if(this.stat.firstTime == 0){

            var q;

            firebase.database().ref(Path2).once('value', (snapshot) => {q = snapshot.val();});

            this.stat.arrayVal = q;

            this.stat.firstTime = 1;
       var TotalArray = snapshot.val();
       var x = 1;
       var Messages = [];


           for (var key in TotalArray) {
            for (var key2 in TotalArray[key]) {
                if(x > this.stat.initialTimeStamps.length){
                    this.stat.initialTimeStamps.push(TotalArray[key][key2][2]);
                        if(TotalArray[key][key2][0] == state.params.email){
                            Messages.push({
                                _id: key,
                                text: TotalArray[key][key2][1],
                                createdAt: TotalArray[key][key2][2],
                                user: {
                                    _id: 1,
                                    name: TotalArray[key][key2][0],
                                    avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                                },
                                image: ('https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg')
                            });
                        }
                        else{
                            Messages.push({
                                _id: key,
                                text: TotalArray[key][key2][1],
                                createdAt: TotalArray[key][key2][2],
                                user: {
                                    _id: key+1,
                                    name: TotalArray[key][key2][0],
                                    avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                                },
                                image: ('https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg')
                            });
                        }

                }
                else{

                }

                x = x+1;
               }
        }

        this.AddToGui(Messages.reverse());
    }


    else{




        this.forceUpdateHandler

         var q;

        firebase.database().ref(Path2).once('value', (snapshot) => {q = snapshot.val();});

        var temp = this.stat.arrayVal;

        this.stat.arrayVal = temp + 1;

        var Path3 = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/' + q;

        var snap;
        firebase.database().ref(Path3).once('value', (snapshot) => {snap = snapshot.val();});

        var Messages = [];

        console.log(q);

        for(var key in snap){

            if(snap[key][0] == state.params.email){
                            Messages.push({
                                _id: q,
                                text: snap[key][1],
                                createdAt: snap[key][2],
                                user: {
                                    _id: 1,
                                    name: snap[key][0],
                                    avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                                },
                            });
                        }
                        else{
                            Messages.push({
                                _id: q,
                                text: snap[key][1],
                                createdAt: snap[key][2],
                                user: {
                                    _id: q+1,
                                    name: snap[key][0],
                                    avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                                },
                            });
                        }


        }


        this.AddToGui(Messages.reverse());












    }













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
            'Select Photo': (props) => {
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
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null

            const imageRef = firebase.storage().ref('images').child('image_001')

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
                    .then(url => { alert('uploaded'); this.setState({image_uri: url}) })
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