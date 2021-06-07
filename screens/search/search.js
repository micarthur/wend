import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";

function SearchScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerMain}>
        <Text>Search!</Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default class Search extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "Search",
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
