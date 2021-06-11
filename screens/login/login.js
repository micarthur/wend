import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AppLoading from "expo-app-loading";
import styles from "./styles";
import t from "prop-types";

const image = require("../splash/wend.png");

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    visible: t.bool.isRequired,
    dismiss: t.func.isRequired,
    transparent: t.bool,
    animationType: t.string,
  };

  static defaultProps = {
    animationType: "slide",
    transparent: true,
  };

  state = {
    email: "",
    password: "",
  };

  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  handleSubmit = () => {
    console.log(this.state.email);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (this.state.email.length < 1 && this.state.password.length < 1) {
      return "both";
    } else if (reg.test(this.state.email) === false) {
      console.log("Email is Not Correct");
      return "email";
    } else if (this.state.password.length < 1) {
      return "pwd";
    } else {
      return "good";
    }
  };

  render() {
    const { props } = this;
    return (
      <SafeAreaView>
        <Modal
          visible={props.visible}
          transparent={props.transparent}
          onRequestClose={props.dismiss}
          animationType={props.animationType}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={props.dismiss}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalView}>
                <Image style={{ width: 150, height: 150 }} source={image} />
                <Text>Sign In</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleEmail}
                    value={this.state.email}
                    mode="outlined"
                    clearButtonMode="while-editing"
                    label="Email"
                    type="email"
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    mode="outlined"
                    clearButtonMode="while-editing"
                    label="Password"
                  />
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.handleSubmit() === "both") {
                        Alert.alert(
                          "Empty Data",
                          "Please enter your information!"
                        );
                      } else if (this.handleSubmit() === "email") {
                        Alert.alert(
                          "Invalid Email",
                          "Please enter a valid email!"
                        );
                      } else if (this.handleSubmit() === "pwd") {
                        Alert.alert(
                          "Invalid Password",
                          "Please enter a valid password!"
                        );
                      } else {
                        props.dismiss();
                        props.navigation.navigate("Tabs", { name: "user" });
                      }
                    }}
                  >
                    <Button
                      icon="account-circle"
                      mode="contained"
                      style={styles.buttonSubmit}
                    >
                      <Text>Sign In</Text>
                    </Button>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={props.dismiss}>
                    <Button
                      icon="window-close"
                      mode="contained"
                      style={styles.buttonCancel}
                    >
                      <Text>Cancel</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
