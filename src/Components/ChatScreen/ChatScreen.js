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
    }

    stat = {
        initialTimeStamps: [],
        firstTime: 0,
        arrayVal: 0,
    }


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