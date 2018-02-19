
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Login from './components/LoginScreen/Login';
import SignUp from './components/SignUpScreen/SignUp';
import Trips from './components/TripsScreen/Trips';
import PasswordReset from './components/PasswordResetScreen/PasswordReset';
import SplashScreen from './components/SplashScreen/SplashScreen';
import NewTrip from './components/NewTripScreen/NewTrip';
import ProfileSettings from './components/ProfileSettingsScreen/ProfileSettings';

// adding all the classes ti navigator
const Home = StackNavigator({
        SplashScreen: {screen: SplashScreen},
        Login: { screen: Login },
        SignUp:{screen: SignUp},
        Trips:{screen: Trips},
        PasswordReset:{screen: PasswordReset},
        NewTrip:{screen: NewTrip},
        ProfileSettings:{screen: ProfileSettings},
    },
    {headerMode: 'screen'});

export default Home;
