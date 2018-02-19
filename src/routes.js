
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Intro from './components/IntroScreen/Intro';

// adding all the classes ti navigator
const Home = StackNavigator({
        Intro:{screen: Intro},
    },
    {headerMode: 'screen'});

export default Home;
