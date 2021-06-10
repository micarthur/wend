import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  // Button,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "react-native-dynamic-search-bar";
import styles from "./styles";

function StocksScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerMain}>
        <View style={styles.searchView}>
          <SearchBar
            placeholder="Search here"
            onPress={() => alert("onPress")}
            onChangeText={(text) => console.log(text)}
            onSearchPress={() => console.log("Search Icon is pressed")}
          />
        </View>
        <Text>Stocks!</Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default class Stocks extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Stocks"
          component={StocksScreen}
          options={{
            title: "Stocks",
            headerRight: () => (
              // <Button
              //   icon="arrow-left-circle"
              //   onPress={() => alert("Back button!")}
              //   color="#007AFF"
              // >
              //   <Text style={styles.textStyle}>Back</Text>
              // </Button>
              <IconButton
                icon="chevron-left-circle"
                color="#007AFF"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}
