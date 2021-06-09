import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { Button, IconButton } from "react-native-paper";
// import { Card, SimpleCard } from "@paraboly/react-native-card";
import Icon from "react-native-vector-icons/Ionicons";
// import { CardButton } from "@paraboly/react-native-card-button"; implement into other parts of app
import { createStackNavigator } from "@react-navigation/stack";
// import { Overlay } from "react-native-elements";
import NewsCard from "../../components/NewsCard/NewsCard";
import styles from "./styles";

{
  /* <Button
          mode="contained"
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.textStyle}>Go Back</Text>
        </Button> */
}
const data = {
  first: "State Department Lifts Travel Restrictions For Dozens Of Countries",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.containerMain}>
        <NewsCard title={data.first} description={data.description} />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard
          title="Third"
          description="Even more bs."
          // style={styles.card}
          // onPress={() => {
          //   alert("Card Pressed");
          // }}
        />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
        <NewsCard title="Second" description="Some more bs." />
      </ScrollView>
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
          // user_name={this.props.user_name}
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
                  // this.props.navigation.goBack();
                  alert(this.props.user_name);
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}
