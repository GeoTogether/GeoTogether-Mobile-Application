import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ActionBar from 'react-native-action-bar';

export default class AppForm extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>
                <View style={styles.appContainer}>

                    <ActionBar
                        containerStyle={styles.bar}
                        title={'View Event'}
                        titleStyle ={styles.title}
                        backgroundColor= {'black'}
                        leftIconImage={require('../../images/profile.png')}
                        onLeftPress={() => navigate('ProfileSettings', { email: state.params.email })}
                        rightIcons={[
                            {
                                image: require('../../images/map.png'), // To use a custom image
                                onPress: () => navigate('GMapView', { email: state.params.email }),
                            },
                            {
                                image: require('../../images/settings.png'), // To use a custom image
                                badge: '1',
                                onPress: () => console.log('settings feature'),
                            },
                        ]}
                    />

                    <View style={styles.infoContainer}>
                    <Text style={styles.splitText}>Event Name</Text>
                    <TextInput style={styles.textInput}
                        defaultValue={'Breakfast'}>

                    </TextInput>

                    <Text style={styles.splitText}>Event Address</Text>
                    <TextInput style={styles.textInput}
                               defaultValue={'123 E. Lake St.'}>

                    </TextInput>



                    <Text style={styles.splitText}>Event Duration</Text>


                    <View style={styles.alignDurationText}>
                    <Text style={styles.startText}>Start</Text>
                    <Text style={styles.endText}>End</Text>
                    </View>
                    <View style={styles.textBox}>
                    <TextInput
                        placeholder="5/25/18"
                        returnKeyType="done"
                        autoCapitalize="words"
                        autoCorrect={true}
                        style={styles.input}
                    />
                        <View style = {styles.rightBox}>
                        <TextInput
                            placeholder="5/25/18"
                            returnKeyType="done"
                            autoCapitalize="words"
                            autoCorrect={true}
                            style={styles.input}
                        />
                        </View>
                    </View>

                    <View style={styles.textBox}>
                        <TextInput
                            placeholder="9:00AM"
                            returnKeyType="done"
                            autoCapitalize="words"
                            autoCorrect={true}
                            style={styles.input}
                        />
                        <View style = {styles.rightBox}>
                            <TextInput
                                placeholder="10:30AM"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                            />
                        </View>
                    </View>
                        <View style={styles.alignButton}>
                        <TouchableOpacity style={styles.buttonContainer} >
                            <Text style={styles.buttonText}>OKAY</Text>
                        </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        backgroundColor: '#ffa53f',
    },

    appContainer: {
        //marginTop: 45,
    },

    input: {
        height: 50,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10
    },

    textInput: {
        textAlign: 'center',
        marginTop: -20,
        fontSize: 16,
        textDecorationLine: 'underline line-through',
    },

    durationInput: {
        height: 50,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },

    altLoginContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
    },

    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 15,
        width: '33%',
    },

    alignButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    splitContainer: {
        marginBottom: 20,
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    splitText: {
        textAlign: 'center',
        color: 'rgb(0,25,88)',
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },

    startText: {
        textAlign: 'left',
        color: 'rgb(0,25,88)',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: '8%',
        marginRight: '68%'
    },
    endText: {
        textAlign: 'right',
        color: 'rgb(0,25,88)',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: -10,
        marginBottom: 10,
        marginRight: '8%'
    },
    textBox: {
        marginLeft: '8%',
        flexDirection: 'row',
    },
    rightBox: {
        marginLeft: '12%'
    },
    alignDurationText: {
        flexDirection: 'row',
    },
    infoContainer: {
        marginTop: '10%'
    }
});
