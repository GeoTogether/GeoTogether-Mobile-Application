import React from "react";
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";

import { StackNavigator } from "react-navigation";

import Swiper from "./Swiper";

export default class Intro extends React.Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide1}>
          <Text style={styles.header}>PLAN</Text>
          <Text style={styles.text}>your dream vacation with your favorite people</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide2}>
          <Text style={styles.header}>CREATE</Text>
          <Text style={styles.text}>events and find the best things to do on your trip</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide3}>
          <Text style={styles.header}>TRAVEL</Text>
          <Text style={styles.text}>with your favorite people and make memories youll never forget</Text>
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
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#FE7C00"
  },
  // Slide styles
  slide2: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#00B4AB"
  },
  // Slide styles
  slide3: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#001958"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});
AppRegistry.registerComponent("Screen", () => Screen);
