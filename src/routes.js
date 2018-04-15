
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
import Share from './components/ShareScreen/Share';


// adding all the classes ti navigator
const Home = StackNavigator({
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Home: { screen: Trips },
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

},
    { headerMode: 'screen' });

export default Home;
