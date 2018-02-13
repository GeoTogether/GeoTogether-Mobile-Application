import React from 'react';

export default class InviteView extends React.Component {

    constructor(props) {
        super(props)

    }

    var SendIntentAndroid = require('react-native-send-intent');

    onPressTextMessage(){
        SendIntentAndroid.sendText({
            title: 'Title of the text message',
            text: 'The actual message goes here',
            type: SendIntentAndroid.TEXT_PLAIN
        });
    }

    onPressEmailInvite(){
        SendIntentAndroid.sendMail("Email Address", "Subject Header", "Message");
    }


    renderCurrentState() {

        const { navigate } = this.props.navigation;

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>

            </LinearGradient>

        );

    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.Container}>


                    <TouchableOpacity onPress={() => this.onPressTextMessage()} style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressEmailInvite()} style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
