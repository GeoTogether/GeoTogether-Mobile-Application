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
        this.grabMessages();

    }chat

    state = {
        tripDatabase: "",
        initialMessages:  [],
        initialUsers:[],
        initialTimeStamps:[],

    };



    async grabMessages(){

        const {state} = this.props.navigation;
        
        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/';
          // Now simply find the parent and return the name.


        var TotalArray;
        firebase.database().ref(Path).on('value', (snapshot) => {

            TotalArray = snapshot.val();
            
        })

        console.log(TotalArray);

        /*

        var MessageArray =[];
        var UserArray=[];
        var TimeStampArray=[];
        

        for (var key in TotalArray) {
            UserArray.push(TotalArray[key][0]);
            MessageArray.push(TotalArray[key][1]);    
            TimeStampArray.push(TotalArray[key][2]);

            
        }

        this.setState({initialMessages: MessageArray});
        this.setState({initialUsers: UserArray});
        this.setState({initialTimeStamps: TimeStampArray});
        */

    }


    sendMessage(message){
        const {state} = this.props.navigation;
        
        var Path = 'trips/' + state.params.tripKey.key + '/chats/groupChat/messages/';

        firebase.database().ref(Path).push({
            
                    
                    0: state.params.email,
                    1: message,
                    2: this.getCurrentTime(),
                    
                
            
        });
    }
    
    addUserToChat(name){

    }

    getCurrentTime(){
        var currentdate = new Date(); 
        return currentdate.getTime();
    }
    

    componentWillMount() {
       
         const {state} = this.props.navigation;

        this.setState({
            messages: [
                {
                    _id: 1,
                    text: state.params.email,
                    createdAt: 1521622981696,
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
        this.sendMessage(messages[0].text);

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