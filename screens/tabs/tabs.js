import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home/home";
import Search from "../search/search";
import Bookmark from "../bookmark/bookmark";
import Stocks from "../stocks/stocks";
import styles from "./styles";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class Tabs extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  // state = {
  // 	overlayVisible: false,
  // };

  // setOverlayVisible = (visible) => {
  // 	this.setState({ overlayVisible: visible });
  // };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Bookmark" component={Bookmark} />
          <Tab.Screen name="Stocks" component={Stocks} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
