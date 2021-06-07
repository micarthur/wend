import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";

function BookmarksScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerMain}>
        <Text>There are currently no bookmarks!</Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default class Bookmark extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{
            title: "Bookmarks",
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
