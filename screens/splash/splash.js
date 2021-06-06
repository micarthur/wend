import React, { Component, useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import * as Facebook from "expo-facebook";
import styles from "./styles";
import {
	facebookAppId,
	googleIOSClientId,
	googleAndroidClientId,
} from "../../config/constants";

const image = require("./fatherson.jpeg");

// const initSocialLogin = async () => {
// 	try {
// 		await Facebook.initializeAsync(facebookAppId);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const fbLogin = async () => {
// 	try {
// 		await Facebook.initializeAsync(facebookAppId);
// 		const { token, type } = await Facebook.logInWithReadPermissionsAsync(
// 			facebookAppId,
// 			{
// 				permissions: ["public_profile"],
// 			}
// 		);

// 		// GET USER DATA FROM FB API
// 		const response = await fetch(
// 			`https://graph.facebook.com/me?access_token=${token}`
// 		);
// 		const user = await response.json();

// 		// GET PROFILE IMAGE DATA FROM FB API
// 		// NOTE THAT I SET THE IMAGE WIDTH TO 500 WHICH IS OPTIONAL
// 		const pictureResponse = await fetch(
// 			`https://graph.facebook.com/v8.0/${user.id}/picture?width=500&redirect=false&access_token=${token}`
// 		);
// 		const pictureOBject = await pictureResponse.json();
// 		const userObject = {
// 			...user,
// 			photoUrl: pictureOBject.data.url,
// 		};

// 		return { type, token, user: userObject };
// 	} catch (e) {
// 		return { error: e };
// 	}
// };

// const handleFBLoginPress = async () => {
// 	const { type, token, user, error } = await fbLogin();

// 	if (type && token) {
// 		if (type === "success") {
// 			// DISPATCH TOKEN AND USER DATA
// 			// TO HANDLE NAVIGATION TO HOME AND DISPLAY USER INFO
// 			dispatch({ type: "FB_LOGIN", token, user });
// 			alert("Here");
// 			console.log(user);
// 		}
// 	} else if (error) {
// 		console.log("The login attempt was cancelled");
// 	}
// };

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

async function logInFacebook() {
	try {
		await Facebook.initializeAsync({
			appId: facebookAppId,
		});
		const {
			type,
			token,
			expirationDate,
			permissions,
			declinedPermissions,
		} = await Facebook.logInWithReadPermissionsAsync({
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
	};
	render() {
		return (
			<ImageBackground source={image} style={styles.image}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.containerMain}>
						<View style={styles.bottomViewGoogle}>
							<Button
								icon="google"
								mode="contained"
								style={styles.buttonGoogle}
								onPress={() =>
									this.props.navigation.navigate("Home", { name: "user" })
								}
							>
								<Text style={styles.textStyleSocial}>Sign In With Google</Text>
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
										this.props.navigation.navigate("Home", {
											name: response.data.name,
											// name: "user",
										});
									}
								}}
							>
								<Text style={styles.textStyleSocial}>Sign In With FB</Text>
							</Button>
						</View>
						<View style={styles.bottomView}>
							<Button
								mode="contained"
								style={styles.button}
								onPress={() => this.props.navigation.navigate("Register")}
							>
								<Text style={styles.textStyle}>Sign Up</Text>
							</Button>
							<Button
								mode="contained"
								style={styles.button}
								onPress={() => this.props.navigation.navigate("Login")}
							>
								<Text style={styles.textStyle}>Sign In</Text>
							</Button>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
		);
	}
}
