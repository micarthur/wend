import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home/home";
import Search from "../search/search";
import Bookmark from "../bookmark/bookmark";
import Stocks from "../stocks/stocks";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import styles from "./styles";

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} />;
}

const Tab = createBottomTabNavigator();

export default class Tabs extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-home";
              } else if (route.name === "Search") {
                iconName = "ios-search";
              } else if (route.name === "Bookmarks") {
                iconName = "ios-bookmarks";
              } else if (route.name === "Stocks") {
                iconName = "ios-trending-up";
              } else if (route.name === "Settings") {
                iconName = "ios-cog";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            // user_name={this.props.name}
            options={{ gestureEnabled: true }}
          />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Bookmarks" component={Bookmark} />
          <Tab.Screen name="Stocks" component={Stocks} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
