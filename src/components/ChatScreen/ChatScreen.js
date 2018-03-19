import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import { View } from 'react-native';
import firebase from '../Firebase/firebaseStorage';


export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);

    }chat

    state = {
        x: '',
    };

    componentWillMount() {
        

        this.setState({
            messages: [
                {
                    
                    _id: 1,
                    text: this.props.navigation,
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

            firebase.database().ref('messages/').push({
              user: "d",
            });

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