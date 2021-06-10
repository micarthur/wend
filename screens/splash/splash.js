import React, { Component, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
// import { AppleButton } from "@invertase/react-native-apple-authentication";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Facebook from "expo-facebook";
import styles from "./styles";
import {
  facebookAppId,
  googleIOSClientId,
  googleAndroidClientId,
} from "../../config/constants";
import Register from "../register/register";
import Login from "../login/login";

const image = require("./wend.png");

async function toggleFacebookAuthAsync() {
  await Facebook.initializeAsync(facebookAppId);
  const auth = await Facebook.getAuthenticationCredentialAsync();
  let body;

  if (!auth) {
    body = await logInFacebook();
  } else {
    console.log(auth);
    const resolvedToken = auth.token;
    const response = await fetch(
      `https://graph.facebook.com/me?fields=email,name&access_token=${resolvedToken}`
    );
    body = await response.json();
    // // alert(`Hi ${body.name}!`);
    // console.log(body);
  }
  return { auth: true, data: body };
}

async function logInApple() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (credential) {
      // this.props.navigation.navigate("Tabs", { name: "user" });
      return credential;
    }
  } catch (e) {
    if (e.code === "ERR_CANCELED") {
      alert("Cancelled!");
    } else {
      // handle other errors
    }
  }
}

async function logInFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: facebookAppId,
    });
    // implement putting in and checking expiration date in database for auth expiration
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["email", "public_profile"],
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=email,name&access_token=${token}`
      );
      const data = await response.json();
      return data;
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default class Splash extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: true,
  };

  state = {
    registerVisible: false,
    loginVisible: false,
  };

  showRegisterModal = () => {
    if (this.state.registerVisible == false) {
      this.setState({ registerVisible: true });
    }
  };
  hideRegisterModal = () => this.setState({ registerVisible: false });

  showLoginModal = () => {
    if (this.state.loginVisible == false) {
      this.setState({ loginVisible: true });
    }
  };
  hideLoginModal = () => this.setState({ loginVisible: false });

  render() {
    StatusBar.setBarStyle("dark-content", true);
    return (
      <ImageBackground source={image} style={styles.image}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerMain}>
            {/* <View style={styles.bottomViewApple}>
              <Button
                icon="apple"
                mode="contained"
                style={styles.buttonApple}
                onPress={() =>
                  // need to rewrite apple authentication
                  this.props.navigation.navigate("Tabs", { name: "user" })
                }
              >
                <Text style={styles.textStyleSocial}>Sign In With Apple</Text>
              </Button>
            </View> */}
            <View style={styles.bottomViewApple}>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={50}
                style={styles.buttonApple}
                onPress={async () => {
                  const response = await logInApple();
                  console.log(response);
                  if (response.authorizationCode) {
                    this.props.navigation.navigate("Tabs");
                  }
                }}
              />
            </View>
            <View style={styles.bottomViewGoogle}>
              <Button
                icon="google"
                mode="contained"
                style={styles.buttonGoogle}
                onPress={() =>
                  this.props.navigation.navigate("Tabs", { name: "user" })
                }
              >
                <Text style={styles.textStyleSocial}>Sign in with Google</Text>
              </Button>
            </View>
            <View style={styles.bottomViewFacebook}>
              <Button
                icon="facebook"
                mode="contained"
                style={styles.buttonFacebook}
                onPress={async () => {
                  const response = await toggleFacebookAuthAsync();
                  if (response.auth) {
                    console.log(response);
                    this.props.navigation.navigate("Tabs", {
                      name: response.data.name,
                    });
                  }
                }}
              >
                <Text style={styles.textStyleSocial}>Sign In With FB</Text>
              </Button>
            </View>
            <View style={styles.bottomView}>
              <View>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={this.showRegisterModal}
                >
                  <Text style={styles.textStyle}>Sign Up</Text>
                </Button>
                <Register
                  visible={this.state.registerVisible}
                  dismiss={this.hideRegisterModal}
                  navigation={this.props.navigation}
                />
              </View>
              <View>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={this.showLoginModal}
                >
                  <Text style={styles.textStyle}>Sign In</Text>
                </Button>
                <Login
                  visible={this.state.loginVisible}
                  dismiss={this.hideLoginModal}
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
