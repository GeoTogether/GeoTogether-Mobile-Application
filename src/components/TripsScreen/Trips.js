import React from 'react';
import { Alert, Modal, ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';



export default class Trips extends React.Component {



  constructor(props) {
    super(props)
  }

  // navigation options to be used to navigate the class from other classes

  static navigationOptions = {
    title: 'Trips',
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
  }


  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  showAlert = () => {
      Alert.alert(
         this.state.UserInvite + ' has been added to the trip'
      )
   }


  componentWillMount() {

    const { state } = this.props.navigation;
    this.setState({ email: state.params.email });
    // gets all the user trips 
     this.onPressGetTrips();



  }

  componentDidMount(){
    const { state } = this.props.navigation;
    this.setState({ email: state.params.email });
    // gets all the user trips 
     this.onPressGetTrips();

  }

  // funcation to sign out using firebase authentication.

  onPressLogOut() {
    const { navigate } = this.props.navigation;



    if (firebase.auth().currentUser !== null) {

      firebase.auth().signOut()
        .then(() => {
          this.setState({
            email: '',
            password: '',
            authenticating: false,
            user: null,
          })
          navigate('Login') // after login go to trips

        }, error => {
          console.error('Sign Out Error', error);
        });

    }




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
    // adding components for all the user trips 
    var Components = this.state.trips.map((type) => <TouchableOpacity style={styles.tripContainer}>  
    <Text style={styles.tripName}> {type.tripName}</Text>  
    <Text style={styles.status}>(Open)</Text>
     <Text style={styles.date}>{type.startDate} -{type.endDate}</Text> 
     <TouchableOpacity style={styles.addUsers} onPress={() => this.openModal()} >
                <Text style={styles.buttonText}>Invite Members To Trip</Text>
       </TouchableOpacity>
       <Text style={styles.members}>Members: {type.members.length} </Text>
        </TouchableOpacity>)

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.formContainer}>



          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

          

          
          
            <View style={styles.container2}>

              <Text style={styles.title}>Home</Text>

             {Components}


              <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          	>

            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>Please Input Which Users You Want To Add Below</Text>
                <TextInput
		          style={{height: 40}}
		          placeholder="Email Address:"
		          onChangeText={(UserInvite) => this.setState({UserInvite})}
		        />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.showAlert()} >
                <Text style={styles.buttonText}>Invite User</Text>
              </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.closeModal()} >
                <Text style={styles.buttonText}>Back To Trip View</Text>
              </TouchableOpacity>
                
	              </View>
	            </View>
	          </Modal>



              <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('NewTrip', { email: this.state.email })} >
                <Text style={styles.buttonText}>NEW TRIP</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('ProfileSettings', { email: this.state.email })} >
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress={() =>this.onPressLogOut()} >
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>

        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffa53f',
  },
  container2: {
    paddingTop: 50
  },

  input: {
    height: 50,
    width: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    paddingHorizontal: 10
  },

  altLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50
  },

  tripContainer: {
    backgroundColor: '#fff',
    padding: 5,
    height: 155,
    width: 350,
    borderRadius: 10,
    marginBottom: 20
  },

  buttonContainer: {
    backgroundColor: 'rgb(0,25,88)',
    paddingVertical: 15
  },

  addUsers: {
    backgroundColor: 'rgb(0,25,88)',
    paddingVertical: 5
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },

  splitContainer: {
    marginBottom: 20,
  },

  tripName: {
    textAlign: 'left',
    padding: 5,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },

  status: {
    padding: 5,
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },

  date: {
    padding: 5,
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },

  members: {
    padding: 5,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },

  title: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: -10,
    marginBottom: 20
  },
});