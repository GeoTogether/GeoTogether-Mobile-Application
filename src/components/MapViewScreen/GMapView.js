import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';







export default class GMapView extends React.Component {

    constructor(props) {
        super(props);



    }


    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'GMapView',
        header: null
    }
    // the user state with all of the user and the trip information 
    state = {
        destinations: [],
        destination2: '',
        authenticating: this.props.authenticating,
        user: this.props.user,
        error: '',
        datastor: '',
        tripname: '',
        members: '',
        latitude: 0.1,
        longitude: 0.1,
        selectedcity: '',
        coords: [],
    };




    componentWillMount() {

        this.showAddress();
     


    }





    showAddress() {


        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;



        Geocoder.fallbackToGoogle('AIzaSyDidve9BD8VNBoxevb5jnmmYltrdSiuM-8');

        for (var i = 0; i < state.params.trip.destinations.length; i++) {

            // Address Geocoding
            Geocoder.geocodeAddress(state.params.trip.destinations[i].toUpperCase()).then(res => {
                // res is an Array of geocoding object (see below)

                this.state.destinations.push(res);
                this.setState({ latitude: res["0"].position.lat });
                this.setState({ longitude: res["0"].position.lng });



            }).catch(err => console.log(err))

        }





    }


    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

 






        return (


            <View style={styles.form}>

  



                <MapView style={styles.map} region={{

                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                   









                </MapView>


            </View>
        )

    }











}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    form: {
        flex: 1
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }, 
    title:{
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    }
});

