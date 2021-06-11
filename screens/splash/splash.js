import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Facebook from "expo-facebook";
import * as FacebookAuth from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";
import AppLoading from "expo-app-loading";
import styles from "./styles";
import { constants } from "../../config/constants";
// import * as Google from "expo-google-app-auth";
import Register from "../register/register";
import Login from "../login/login";

WebBrowser.maybeCompleteAuthSession();
const image = require("./wend.png");

async function toggleFacebookAuthAsync() {
  try {
    await Facebook.logOutAsync();
    await Facebook.initializeAsync({
      appId: constants.facebookAppId,
      appName: constants.facebookDisplayName,
    });
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
      console.log(body);
      // // alert(`Hi ${body.name}!`);
      // console.log(body);
    }
    return { auth: true, data: body };
  } catch (e) {
    throw e;
  }
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
    throw e;
  }
}

async function logInFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: constants.facebookAppId,
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
    throw new Error(`Facebook Login Error: ${message}`);
  }
}

export default function Splash({ navigation }) {
  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    FacebookAuth.useAuthRequest({
      clientId: constants.facebookAppId,
      responseType: ResponseType.Code,
    });

  React.useEffect(() => {
    if (responseFacebook?.type === "success") {
      const { code } = responseFacebook.params;
      console.log(responseFacebook);
      navigation.navigate("Tabs");
    }
  }, [responseFacebook]);

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      expoClientId: constants.googleClientId,
      iosClientId: constants.googleIOSClientId,
    });

  React.useEffect(() => {
    if (responseGoogle?.type === "success") {
      const { authentication } = responseGoogle;
      console.log(responseGoogle);
      navigation.navigate("Tabs");
    }
  }, [responseGoogle]);

  const [registerVisible, setRegisterVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  showRegisterModal = () => {
    if (registerVisible == false) {
      setRegisterVisible(true);
    }
  };
  hideRegisterModal = () => setRegisterVisible(false);

  showLoginModal = () => {
    if (loginVisible == false) {
      setLoginVisible(true);
    }
  };
  hideLoginModal = () => setLoginVisible(false);

  // render() {
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
                try {
                  const response = await logInApple();
                  console.log(response);
                  // authenticate response.user with user from database here
                  if (response.authorizationCode) {
                    navigation.navigate("Tabs");
                  }
                } catch (e) {
                  if (e.code === "ERR_CANCELED") {
                    console.log("Apple Sign In Request Cancelled!");
                  } else {
                    console.log(e);
                  }
                }
              }}
            />
          </View>
          <View style={styles.bottomViewFacebook}>
            <Button
              icon="facebook"
              mode="contained"
              style={styles.buttonFacebook}
              onPress={async () => {
                // try {
                //   const response = await toggleFacebookAuthAsync();
                //   if (response.auth) {
                //     console.log(response);
                //     navigation.navigate("Tabs");
                //   }
                // } catch (e) {
                //   console.log(e);
                // }
                promptAsyncFacebook();
              }}
            >
              <Text style={styles.textStyleSocial}>Sign In With FB</Text>
            </Button>
          </View>
          <View style={styles.bottomViewGoogle}>
            <Button
              icon="google"
              mode="contained"
              style={styles.buttonGoogle}
              onPress={() => {
                promptAsyncGoogle();
              }}
            >
              <Text style={styles.textStyleSocial}>Sign in with Google</Text>
            </Button>
          </View>
          <View style={styles.bottomView}>
            <View>
              <Button
                mode="contained"
                style={styles.button}
                onPress={showRegisterModal}
              >
                <Text style={styles.textStyle}>Sign Up</Text>
              </Button>
              <Register
                visible={registerVisible}
                dismiss={hideRegisterModal}
                navigation={navigation}
              />
            </View>
            <View>
              <Button
                mode="contained"
                style={styles.button}
                onPress={showLoginModal}
              >
                <Text style={styles.textStyle}>Sign In</Text>
              </Button>
              <Login
                visible={loginVisible}
                dismiss={hideLoginModal}
                navigation={navigation}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
  // }
}
