import React from 'react';
import { BackHandler, StyleSheet, Text, View, StatusBar, ScrollView, Alert, Image, Modal, ActivityIndicator, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Dimensions } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import TripScreen from '../TripsScreen/Trips';
import ActionBar from 'react-native-action-bar';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '../Firebase/firebaseStorage';
import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        //this.onBackPress = this.onBackPress.bind(this)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Chat',
        header: null
    };

    state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
        name: '',
        trips: [],
        tripsNames: [],
        modalVisible: false,
        UserInvite: '',
        newUser: 2,
    }


    px2dp(px) {

        const deviceW = Dimensions.get('window').width;

        const basePx = 375;

        return px * deviceW / basePx
    }

    componentDidMount() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        this.state.email = state.params.email;
       // this.setState({ email: firebase.auth().currentUser.email });


        // gets all the user trips
        this.onPressGetTrips();

        // BackHandler.addEventListener('hardwareBackPress', function () {
        //     BackHandler.exitApp();
        //     return true;
        // });
    }

    componentWillUnmount() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
       // this.setState({ email: firebase.auth().currentUser.email });

       this.state.email = state.params.email;

        // gets all the user trips
        this.onPressGetTrips();

        // //    console.log("unmounting");
        // BackHandler.removeEventListener('hardwareBackPress', function () {
        //     BackHandler.exitApp();
        //     return false;
        // });

    }



    // function to get all the user trips using firebase database
    async onPressGetTrips() {

        // get all the user trips from the firebase database
        firebase.database().ref('trips/').on('value', (snapshot) => {
            snapshot.forEach((tripSnapshot) => {


                const val = tripSnapshot.val();


                if (val.members.indexOf(this.state.email) != -1) {

                    if (this.state.tripsNames.indexOf(val.tripName) == -1) {

                        this.state.trips.push(tripSnapshot);
                        this.state.tripsNames.push(val.tripName);

                        //   this.setState({ tripsNames: this.state.tripsNames.concat(val.tripName) })

                    }



                }

            })
        })

        this.forceUpdate();


    }


    render() {

        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        var components = this.state.trips.map((type) =>
        <TouchableOpacity style={styles.tripComponent} onPress={() => navigate('ChatScreen', { tripKey: type, trip: type.val(), email: this.state.email })}>
            <View style={styles.textRow}>
                <Text style={styles.tripName}>{type.val().tripName}</Text>
                <Text style={styles.status}>(Open)</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={styles.members}>Members: {type.val().members.length} </Text>
                <Text style={styles.date}>{type.val().startDate} - {type.val().endDate}</Text>
            </View>
        </TouchableOpacity>);


        return (

            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>

                <View style={styles.mainStyle}>
                    <StatusBar
                        //status bar fix
                        //backgroundColor="#000"
                        barStyle="dark-content"
                    />
                    <ActionBar
                        containerStyle={styles.bar}
                        title={'Chat'}
                        titleStyle={styles.title}
                        backgroundColor={'#FFFFFF'}
                        badgeColor={'red'}
                        iconImageStyle={{tintColor: "black"}}
                        leftIconImage={require('../../images/profile.png')}
                        onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                        rightIcons={[
                            {
                                image: require('../../images/settings.png'), // To use a custom image
                                //badge: '1',
                                onPress: () => navigate('AppSettings', { email: state.params.email })
                            },
                        ]}
                    />

                       <View style={styles.tripContainer}>
                    <ScrollView>
                        <View style={styles.tripView}>
                            {components}
                        </View>
                    </ScrollView>


                    </View>

                    <TabNavigator>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Chat'}
                                title="Chat"
                                renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                onPress={() => navigate('Chat', { email: this.state.email })}>
                            </TabNavigator.Item>

                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'home'}
                                title="Home"
                                renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#666" />}
                                renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                onPress={() => navigate('Home', { email: this.state.email })}>
                            </TabNavigator.Item>

                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Share'}
                                title="Share"
                                renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#666" />}
                                renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                onPress={() => navigate('Share', { email: this.state.email })}>
                            </TabNavigator.Item>
                        </TabNavigator>

                </View>

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainStyle: {
        flex: 1,
        width: '100%',
        height:'100%',
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        marginTop: '60%'
    },
    tripContainer: {
        height: '75%',
        width: '95%',
        paddingTop: 35,
        // backgroundColor: 'black',
    },
    tripView: {
        flex: 1,
        //backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tripComponent: {
        backgroundColor: '#fff',
        height: 100,
        width: 340,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    tripName: {
        textAlign: 'left',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 20,
        paddingLeft: 15,
        paddingTop: 10,
    },
    status: {
        textAlign: 'right',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 20,
        paddingRight: 15,
        paddingTop: 35
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        textAlign: 'right',
        color: '#ffc400',
        fontWeight: 'normal',
        fontSize: 12,
        paddingRight: 15,
        paddingBottom: 10
    },
    members: {
        textAlign: 'left',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 12,
        paddingLeft: 15,
        paddingBottom: 10
    },
    addButtonContainer: {
        //backgroundColor: 'rgb(0,25,88)',
        //flexDirection: 'row'
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingRight: 10,
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
        title: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
});
