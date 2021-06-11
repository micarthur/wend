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
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AppLoading from "expo-app-loading";
import styles from "./styles";
import t from "prop-types";

const image = require("../splash/wend.png");

export default class Register extends Component {
  //   static navigationOptions = {
  //     headerShown: false,
  //   };

  //   const [modalVisible, setModalVisible] = useState(false);

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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleFirstName = (text) => {
    this.setState({ firstName: text });
  };
  handleLastName = (text) => {
    this.setState({ lastName: text });
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  handleSubmit = () => {
    if (
      this.state.firstName.length < 1 ||
      this.state.lastName.length < 1 ||
      this.state.email.length < 1 ||
      this.state.password.length < 1
    ) {
      return false;
    } else {
      return true;
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
                <Text>Sign Up</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleFirstName}
                    value={this.state.firstName}
                    mode="outlined"
                    clearButtonMode="while-editing"
                    label="First Name"
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleLastName}
                    value={this.state.lastName}
                    mode="outlined"
                    clearButtonMode="while-editing"
                    label="Last Name"
                  />
                </View>
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
                <View style={styles.inputView}>
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
                      if (this.handleSubmit()) {
                        props.dismiss();
                        props.navigation.navigate("Tabs", { name: "user" });
                      } else {
                        alert("Please fill out all fields!");
                      }
                    }}
                  >
                    <Button
                      icon="account-circle"
                      mode="contained"
                      style={styles.buttonSubmit}
                    >
                      <Text>Submit</Text>
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
          {/* </TouchableOpacity> */}

          {/* <View style={styles.modalContent}>{props.children}</View> */}
        </Modal>
      </SafeAreaView>
    );
  }
}
