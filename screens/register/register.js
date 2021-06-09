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
// import { Overlay } from "react-native-elements";
import styles from "./styles";
import t from "prop-types";

const image = require("../splash/wend.png");

export default class Register extends Component {
  //   static navigationOptions = {
  //     headerShown: false,
  //   };

  //   const [modalVisible, setModalVisible] = useState(false);

  // state = {
  // 	overlayVisible: false,
  // };

  // setOverlayVisible = (visible) => {
  // 	this.setState({ overlayVisible: visible });
  // };

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
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => console.log(text)}
                    //   value={number}
                    placeholder="First Name"
                    mode="outlined"
                  />
                </View>
                <Pressable>
                  <View>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => console.log(text)}
                      //   value={number}
                      placeholder="Last Name"
                      mode="outlined"
                    />
                  </View>
                </Pressable>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => console.log(text)}
                    //   value={number}
                    placeholder="Email"
                    mode="outlined"
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => console.log(text)}
                    //   value={number}
                    placeholder="Password"
                    mode="outlined"
                  />
                </View>
                <View style={styles.buttonView}>
                  <Button
                    icon="google"
                    mode="contained"
                    style={styles.button}
                    //   onPress={() =>
                    //     this.props.navigation.navigate("Tabs", { name: "user" })
                    //   }
                  >
                    <Text>Submit</Text>
                  </Button>
                  <TouchableOpacity onPress={props.dismiss}>
                    <Button
                      icon="google"
                      mode="contained"
                      style={styles.button}
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
