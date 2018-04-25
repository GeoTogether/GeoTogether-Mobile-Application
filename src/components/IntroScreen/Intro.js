import React from "react";
import {
    AppRegistry,
    StyleSheet, // CSS-like styles
    Text, // Renders text
    View,

    Image, Dimensions  // Container component
} from "react-native";

import { StackNavigator } from "react-navigation";

const { width, height } = Dimensions.get("window");

import Swiper from "./Swiper";

export default class Intro extends React.Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide1}>
            <Image
                source={require('../../images/screen1.png')}
            />

        </View>
        {/* Second screen */}
        <View style={styles.slide2}>
            <Image
                source={require('../../images/screen2.png')}
            />
        </View>
        {/* Third screen */}
        <View style={styles.slide3}>
            <Image
                source={require('../../images/screen3.png')}
            />
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide1: {
    width: '100%',
    height: height,
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#000000"
  },
  // Slide styles
  slide2: {
      width: '100%',
      height: height,
      flex: 1, // Take up all screen
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      backgroundColor: "#00B4AB"
  },
  // Slide styles
  slide3: {
      width: width,
      height: height,
      flex: 1, // Take up all screen
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      backgroundColor: "#001958"
  },
  // Header styles
  header: {
    color: "#000000",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#000000",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});
AppRegistry.registerComponent("Screen", () => Screen);