import React from 'react';
import { ScrollView, Alert, Modal, ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';


export default class TripsScreenPlay extends React.Component {



    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        // adding components for all the user trips
        var Components = <TouchableOpacity style={styles.tripContainer}>
            <Text style={styles.tripName}> The Trip</Text>
            <Text style={styles.status}>(Open)</Text>
            <Text style={styles.date}>1-12-18 - 1-15-18</Text>
            <Text style={styles.members}>Members: 5</Text>
        </TouchableOpacity>;

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>

                <View style={styles.tripContainer}>
                    <ScrollView>
                        <View style={styles.tripView}>
                        <TouchableOpacity style={styles.tripComponent}>
                            <View style={styles.textRow}>
                            <Text style={styles.tripName}>Trip 1</Text>
                            <Text style={styles.status}>(Open)</Text>
                            </View>
                            <View style={styles.textRow}>
                            <Text style={styles.members}>Members: 5</Text>
                                <Text style={styles.date}>1-12-18 - 1-15-18</Text>
                            </View>
                        </TouchableOpacity>
                            <TouchableOpacity style={styles.tripComponent}>
                                <View style={styles.textRow}>
                                    <Text style={styles.tripName}>Trip 2</Text>
                                    <Text style={styles.status}>(Open)</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Text style={styles.members}>Members: 5</Text>
                                    <Text style={styles.date}>1-12-18 - 1-15-18</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tripComponent}>
                                <View style={styles.textRow}>
                                    <Text style={styles.tripName}>Trip 3</Text>
                                    <Text style={styles.status}>(Open)</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Text style={styles.members}>Members: 5</Text>
                                    <Text style={styles.date}>1-12-18 - 1-15-18</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tripComponent}>
                                <View style={styles.textRow}>
                                    <Text style={styles.tripName}>Trip 4</Text>
                                    <Text style={styles.status}>(Closed)</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Text style={styles.members}>Members: 5</Text>
                                    <Text style={styles.date}>1-12-18 - 1-15-18</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tripComponent}>
                                <View style={styles.textRow}>
                                    <Text style={styles.tripName}>Trip 5</Text>
                                    <Text style={styles.status}>(Closed)</Text>
                                </View>
                                <View style={styles.textRow}>
                                    <Text style={styles.members}>Members: 5</Text>
                                    <Text style={styles.date}>1-12-18 - 1-15-18</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/*<TouchableOpacity style={styles.tripComponent}>*/}
                            {/*<Text style={styles.tripName}> The Trip</Text>*/}
                            {/*<Text style={styles.status}>(Open)</Text>*/}
                            {/*<Text style={styles.date}>1-12-18 - 1-15-18</Text>*/}
                            {/*<Text style={styles.members}>Members: 5</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </ScrollView>
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
    tripContainer: {
        height: '75%',
        width: '95%',
       // backgroundColor: 'black',
    },
    tripView:{
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
    textRow:{
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
    }
});