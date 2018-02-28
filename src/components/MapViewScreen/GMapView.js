import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, Modal} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import MapViewDirections from 'react-native-maps-directions';
import ActionBar from 'react-native-action-bar';
import PopupDialog from 'react-native-popup-dialog';







export default class GMapView extends React.Component {

    constructor(props) {
        super(props);



    }

    getTripInfo(){
        this.getTime();
    	this.popupDialog.show(() => {
		  
		});
    }

    getTime(){
        if(this.state.trip == "null"){

        }
        else{
            var TripDateEnd = this.state.trip.endDate.split('-');
            var UnixTripDateEnd = new Date(TripDateEnd[0]+'/'+TripDateEnd[1]+'/'+TripDateEnd[2]);
            var UnixTripDateStart = new Date();
            var x = new Date().toLocaleString();
            var diffMs = (UnixTripDateEnd - UnixTripDateStart); // milliseconds between now & Christmas
            
            var Days = Math.floor(diffMs / 86400000); // days
            var Hours = Math.floor((diffMs % 86400000) / 3600000); // hours
            var Mins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes


            if(diffMs <= 0){
                    this.setState({ days: ("0")});
                    this.setState({ hours: ("0")});
                    this.setState({ mins: ("0")});


                }
                else{
                    this.setState({ days: (Days)});
                    this.setState({ hours: (Hours)});
                    this.setState({ mins: (Mins)});
                }

                
            

        
        }
    }

    closeInfo(){
    	this.popupDialog.dismiss(() => {
		 
		});
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
        trip: "null",
        days: "0",
        hours: "0",
        mins: "0",
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


        this.setState({ trip: state.params.trip });


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


                
	                <View style={styles.container}>
					  <PopupDialog 
					    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        width={.7}
                        height={.55}
					  >
					    <View style={styles.infoContainer}>

					      <Text style={styles.titleInfoText}>Trip Info</Text>

					      	<View
							  style={{
							    borderBottomColor: 'black',
							    borderBottomWidth: 1,
							    paddingBottom: 10,
							  }}
							/>

					      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
							 <Text style={styles.infoText1}>Group Total: </Text> 
							 <Text style={styles.infoText2}> $300.12 </Text>
						  </View>

						  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
							 <Text style={styles.infoText1}>My Total: </Text> 
							 <Text style={styles.infoText2}> $101.66 </Text>
						  </View>

						  <Text style={styles.infoText3}> details </Text>

						  <View
							  style={{
							    borderBottomColor: 'black',
							    borderBottomWidth: 1,
							    paddingBottom: 10,
							  }}
							/>

						  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
							 <Text style={styles.infoText1}># Trip Members: </Text> 
							 <Text style={styles.infoText2}> {this.state.trip.members.length} </Text>
						  </View>

						  <Text style={styles.infoText3}> details </Text>

						  <View
							  style={{
							    borderBottomColor: 'black',
							    borderBottomWidth: 1,
							    paddingBottom: 10,
							  }}
							/>

							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
							 <Text style={styles.infoText1}>Duration: </Text> 

                             <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                                    <Text style={styles.timeText}> {this.state.days} </Text>
                                    <Text style={styles.infoText1}> days </Text>
                              </View>
                              
                              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                                    <Text style={styles.timeText}> {this.state.hours} </Text>
                                    <Text style={styles.infoText1}> hours </Text>
                              </View>

                              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                                    <Text style={styles.timeText}> {this.state.mins} </Text>
                                    <Text style={styles.infoText1}> mins </Text>
                              </View>
						  </View>

						  <View style={styles.centerView}>
					      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.closeInfo()}>
	                      		<Text style={styles.buttonText}>Close</Text>
	                      </TouchableOpacity>
	                      </View>

					    </View>
					  </PopupDialog>
					</View>
				

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
    buttonStyle: {
        backgroundColor: 'rgb(0,25,88)',
        width: 150,
        height: 45,
        borderRadius: 10
    },
    centerView: {
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100'
    },
    infoContainer:{
    	paddingRight: 40,
    	paddingLeft:40,

    },
    titleInfoText:{
        textAlign: 'center',
        color: 'rgb(128,128,128)',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 30,
        paddingTop: 10,
    },
    infoText1:{
    	textAlign: 'center',
        color: 'rgb(128,128,128)',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 30,
    },
    infoText2:{
        color: '#000',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 30,
    },
    infoText3:{
        color: '#000',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 30,
        textAlign: 'center',
    },
    timeText:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
    }
});

