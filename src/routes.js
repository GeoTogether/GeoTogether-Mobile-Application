
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Intro from './components/IntroScreen/Intro';
import Login from './components/LoginScreen/Login';
import SignUp from './components/SignUpScreen/SignUp';
import Trips from './components/TripsScreen/Trips';
import PasswordReset from './components/PasswordResetScreen/PasswordReset';
import SplashScreen from './components/SplashScreen/SplashScreen';
import NewTrip from './components/NewTripScreen/NewTrip';
import ProfileSettings from './components/ProfileSettingsScreen/ProfileSettings';
import AppSettings from './components/SettingsScreen/AppSettings';
import TimeLineScreen from "./components/TimelineScreen/TimeLineScreen";
import GMapView from './components/MapViewScreen/GMapView';
import NewEvent from './components/NewEventScreen/NewEvent';
import Chat from './components/ChatScreen/Chat';
import ChatScreen from './components/ChatScreen/ChatScreen';
import Share from './components/ShareScreen/Share';
import Loading from './components/LoadingScreen/LoadingScreen';

// adding all the classes ti navigator
const Home = StackNavigator({
    Loading: { screen: Loading },
    Home: { screen: Trips },
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Chat: { screen: Chat },
    Share: { screen: Share },
    PasswordReset: { screen: PasswordReset },
    NewTrip: { screen: NewTrip },
    ProfileSettings: { screen: ProfileSettings },
    AppSettings: { screen: AppSettings },
    Intro: { screen: Intro },
    GMapView:{screen: GMapView},
    TimeLineScreen: {screen: TimeLineScreen},
    NewEvent:{screen: NewEvent},
    ChatScreen:{screen: ChatScreen},

},
    { headerMode: 'screen' });

export default Home;
