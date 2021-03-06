import React from 'react';
import { NativeAppEventEmitter, ScrollView, Alert, Image, Modal, ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar, BackHandler, Dimensions } from 'react-native';
import {
    StackNavigator,
    TabBarBottom
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';

import Chat from "../ChatScreen/Chat";
import Share from "../ShareScreen/Share";
import MapView from "../MapViewScreen/GMapView";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionBar from 'react-native-action-bar';
import TabNavigator from 'react-native-tab-navigator';
import {RevMobManager} from 'react-native-revmob';
import RNExitApp from 'react-native-exit-app';

export default class Trips extends React.Component {

    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Home',
        header: null
    }

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

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    showAlert = () => {
        Alert.alert(
            this.state.UserInvite + ' has been added to the trip'
        )
    }


    componentWillMount() {
        RevMobManager.showBanner();
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        this.checkNewUser();

        // gets all the user trips
        this.onPressGetTrips();
    }

    componentDidMount() {
        RevMobManager.startSession("5ac329b0a30c3b1c882e56fb", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadBanner();
        });
        NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
            RevMobManager.showBanner(); // Show banner if it's loaded
        });
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        this.checkNewUser();

        // gets all the user trips
        this.onPressGetTrips();
        RevMobManager.showBanner();

        BackHandler.addEventListener('hardwareBackPress', function() {
            Alert.alert(
                'Exit App',
                'Do you want to exit the app?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => RNExitApp.exitApp()},
                ],
                { cancelable: false }
            )
            return true;
        });
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress');
    }

    // // funcation to sign out using firebase authentication.

    // onPressLogOut() {
    //     const { navigate } = this.props.navigation;

    //     if (firebase.auth().currentUser !== null) {

    //         firebase.auth().signOut()
    //             .then(() => {
    //                 this.setState({
    //                     email: '',
    //                     password: '',
    //                     authenticating: false,
    //                     user: null,
    //                 })
    //                 navigate('SplashScreen') // after login go to trips

    //             }, error => {
    //                 console.error('Sign Out Error', error);
    //             });
    //     }
    // }

    async checkNewUser() {
        const { navigate } = this.props.navigation;

        firebase.database().ref('users/').on('value', (snapshot) => {
            snapshot.forEach((userSnapshot) => {

                const val = userSnapshot.val();

                if (val.email == this.state.email) {
                    if (val.newUser == 1) {
                        this.setState({ newUser: 1 });
                        firebase.database().ref('users/').child(userSnapshot.key).set({
                            first: val.first,
                            last: val.last,
                            email: val.email,
                            photo: val.photo,
                            newUser: 2,
                        }
                        )
                        navigate('Intro', { email: this.state.email });
                    }
                }
            })
        })
    }

    // function to get all the user trips using firebase database
    async onPressGetTrips() {

        // get all the user trips from the firebase database
        firebase.database().ref('trips/').on('value', (snapshot) => {
            snapshot.forEach((tripSnapshot) => {
                const val = tripSnapshot.val();
                if (val.members.indexOf(this.state.email) != -1) {
                    if (this.state.tripsNames.indexOf(val.tripName) == -1) {
                        this.state.trips.push(val);
                        this.setState({ tripsNames: this.state.tripsNames.concat(val.tripName) })
                    }
                }
            })
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        // adding components for all the user trips


        var components = this.state.trips.map((type) =>
            <TouchableOpacity style={styles.tripComponent} onPress={() => navigate('GMapView', { trip: type, email: this.state.email })}>
                <View style={styles.textRow}>
                    <Text style={styles.tripName}>{type.tripName}</Text>
                    <Text style={styles.status}>(Open)</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.members}>Members: {type.members.length} </Text>
                    <Text style={styles.date}>{type.startDate} - {type.endDate}</Text>
                </View>
            </TouchableOpacity>);

        return (
            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>

<View style={styles.mainStyle}>

    <View style={styles.adContainer}>
    </View>

                    <StatusBar
                        //status bar fix
                        //backgroundColor="#000"
                        barStyle="dark-content"
                    />

                    <ActionBar
                        containerStyle={styles.bar}
                        title={'Home'}
                        titleStyle={styles.title}
                        backgroundColor={'#FFF'}
                        badgeColor={'red'}
                        iconImageStyle={{ tintColor: "black" }}
                        leftIconImage={require('../../images/profile.png')}
                        onLeftPress={() => navigate('ProfileSettings', { email: state.params.email }, RevMobManager.hideBanner())}
                        rightIcons={[
                            {
                                image: require('../../images/settings.png'), // To use a custom image
                                //badge: '1',
                                onPress: () => navigate('AppSettings', { email: state.params.email }, RevMobManager.hideBanner()),
                            },
                        ]}
                    />
              

                <View style={styles.tripParentContainer}>
                <View style={styles.tripContainer}>
                    <ScrollView>
                        <View style={styles.tripView}>
                            {components}
                        </View>
                    </ScrollView>
                </View>
                </View>

                <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={() => navigate('NewTrip', { email: this.state.email })}>
                        <Image
                            source={require('../../images/addbutton.png')}
                        />
                    </TouchableOpacity>
                </View>


                <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Chat'}
                            title="Chat"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Chat', { email: this.state.email }, RevMobManager.hideBanner())}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title="Home"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Home', { email: this.state.email }, RevMobManager.hideBanner())}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Share'}
                            title="Share"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Share', { email: this.state.email }, RevMobManager.hideBanner())}>
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
    adContainer:{
        width: '100%',
        height: '10%',
        backgroundColor: '#FFF'
    },
    mainStyle: {
        flex: 1,
        width: '100%',
        height:'100%'
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
    tripParentContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    tripContainer: {
        height: '75%',
        width: '95%',
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
        bottom: 40,
        right: 0,
        paddingRight: 10,
        paddingBottom: 40,
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