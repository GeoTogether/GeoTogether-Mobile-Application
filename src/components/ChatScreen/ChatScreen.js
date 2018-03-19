import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import { View } from 'react-native';
import firebase from '../Firebase/firebaseStorage';


export default class ChatScreen extends React.Component {

    static navigationOptions = {
        title: 'ChatScreen',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);
        

    }chat

    state = {
        tripDatabase: this.getTripSnapshot(),
    };

    grabMessages(){

    }
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
    getTripSnapshot(){
        const {state} = this.props.navigation;
        console.log(state.params.trip);
        return "d";

    }

    componentWillMount() {
       
         const {state} = this.props.navigation;

        this.setState({
            messages: [
                {
                    
                    _id: 1,
                    text: state.params.trip.members,
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://i.pinimg.com/originals/9c/53/50/9c5350210821ef961feca8e70ebd4160.jpg',
                    },
                },
            ],
        });
    }
    onSend(messages = []) {
        this.createGroupChat();

        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }


    render() {
        return (

            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                    name: 'Benji',
                }}
            />

        );
    }
}



//firebase.auth().currentUser.email user
//state.params.trip
/*
firebase.database().ref('trips/-L5q1pe515Q60z5TdwyG/chats/-L7yYPJFjToQ-_IrP1Ut/messages').push({
                  user: "hellos@gmail.com",
                  content: "sup",
                  timestamp: "7:02",

        });
        */