import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Card } from "react-native-material-ui";
import { createStackNavigator } from "@react-navigation/stack";
// import { Overlay } from "react-native-elements";
import styles from "./styles";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerMain}>
        <Text>Welcome!</Text>
        {/* <Button
          mode="contained"
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.textStyle}>Go Back</Text>
        </Button> */}
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default class Home extends Component {
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
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
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
