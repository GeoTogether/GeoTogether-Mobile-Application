import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, Modal} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import MapViewDirections from 'react-native-maps-directions';
import ActionBar from 'react-native-action-bar';







export default class GMapView extends React.Component {

    constructor(props) {
        super(props);



    }

    getTripInfo(){
    	this.openModal();
    }

    openModal() {
	  	this.setState({modalVisible:true});
	}

	closeModal() {
	  	this.setState({modalVisible:false});
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
        modalVisible: false,
    };




    componentWillMount() {

        this.showAddress();
        this.showDirections();


    }


    showDirections() {

        const { state } = this.props.navigation;

        for (var i = 0; i < state.params.trip.destinations.length - 1; i++) {


            var obj = { d1: state.params.trip.destinations[i], d2: state.params.trip.destinations[i + 1] };
            this.state.coords.push(obj);

        }



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

        // adding buttom components for all the user trips 
        var MarkersComponents = this.state.destinations.map((type) => <MapView.Marker coordinate={{
            latitude: type["0"].position.lat,
            longitude: type["0"].position.lng
        }} title={'marker'}
            description={this.state.destination1} />)


        var origin1 = state.params.trip.destinations[0];
        var destination1 = state.params.trip.destinations[1];
        var apikey1 = 'AIzaSyDidve9BD8VNBoxevb5jnmmYltrdSiuM-8';

        var dirComponents = this.state.coords.map((type) => <MapViewDirections
            origin={type.d1}
            destination={type.d2}
            apikey={apikey1}
            strokeWidth={3}
            strokeColor="blue"
        />)






        return (


            <View style={styles.form}>

                <ActionBar
                    containerStyle={styles.bar}
                    title={state.params.trip.tripName}
                    titleStyle ={styles.title}
                    backgroundColor= {'black'}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                    rightIcons={[
                        {
                            image: require('../../images/settings.png'), // To use a custom image
                            badge: '1',
                            onPress: () => console.log('Right Custom image !'),
                        },
                    ]}
                />




                <MapView style={styles.map} region={{

                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                    {MarkersComponents}

                    {dirComponents}

                
                </MapView>


                
                <Modal
	              visible={this.state.modalVisible}
	              animationType={'slide'}
	              onRequestClose={() => this.closeModal()}
	          	>
	            <View style={styles.infoContainer}>
	                <Text style={styles.infoText}>This is content inside of modal component</Text>
	            </View>
	          </Modal>
				

				<TouchableHighlight onPress={()=>this.getTripInfo()} style={{position: "absolute", bottom: 0, right: 0, height: 30, width: 30}}>
				    <Image style={{position: "absolute", bottom: 0, right: 0, height: 30, width: 30}} source={require('../../images/infobutton.png')} />
				</TouchableHighlight>

               	
				    
				
                 


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
        color: 'white',
        fontWeight: '700'
    },
    infoContainer:{

    },
    infoText:{
    	textAlign: 'center',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 12,
    }
});

