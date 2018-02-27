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
import firebase from '../Firebase/firebaseStorage';







export default class GMapView extends React.Component {

    constructor(props) {
        super(props);



    }

    getTripInfo(){

    	this.popupDialog.show(() => {
		  
		});
    }

    closeInfo(){
    	this.popupDialog.dismiss(() => {
		 
		});
    }

	updateInfo = () => {
        var userData;
        var db = firebase.database();

        var leadsRef = firebase.database().ref('users');

        leadsRef.on('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {

              if(childSnapshot.child("email").val() == tempEmail){
                userData = childSnapshot.key;
              }
              else{
                
              }
              //userData = childSnapshot.val();
              //userData2 = childSnapshot.child("email").val();
              

            });
    });     

        
                if(this.state.email == this.state.previousEmail){
                    //changing names
                    db.ref("users/"+userData+"/first").set(this.state.fname);
                    db.ref("users/"+userData+"/last").set(this.state.lname);
                }
                else{
                    //chaning authorization and names and trips
                    var user = firebase.auth().currentUser;
                    console.log("here");
                    db.ref("users/"+userData+"/email").set(this.state.email);
                    db.ref("users/"+userData+"/first").set(this.state.fname);
                    db.ref("users/"+userData+"/last").set(this.state.lname);
                    user.updateEmail(this.state.email).then(function() {

                    }).catch(function(error) {
                       
                    });

                    var leadsRef2 = firebase.database().ref('trips');

                    leadsRef2.on('value', function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {

                            if(childSnapshot.val().members.indexOf(tempEmail) != -1){
                                var index = childSnapshot.val().members.indexOf(tempEmail);
                                db.ref("trips/"+childSnapshot.key+"/members/"+index+"").set(currentEmail);

                                console.log(childSnapshot.key);
                                console.log(index);
                           }

                          if(childSnapshot.child("admin").val() == tempEmail){
                            db.ref("trips/"+childSnapshot.key+"/admin").set(currentEmail);

                          }
                          else{
                            
                          }
                          
                          

                        });
                });

                }
       
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
        email: "nope",
        trip: "",
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


        this.setState({ email: state.params.email });
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
					  >
					    <View style={styles.infoContainer}>

					      <Text style={styles.infoText1}>Trip Info</Text>

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
							 <Text style={styles.infoText2}> $300.12 </Text>
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
							 <Text style={styles.infoText2}> 3:23:10 </Text>
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
    }
});

