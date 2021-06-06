import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
// import { Overlay } from "react-native-elements";
import styles from "./styles";

export default class Login extends Component {
	static navigationOptions = {
		headerShown: false,
	};

	// state = {
	// 	overlayVisible: false,
	// };

	// setOverlayVisible = (visible) => {
	// 	this.setState({ overlayVisible: visible });
	// };

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.containerMain}>
					<Text>Login Screen</Text>
				</View>
			</SafeAreaView>
		);
	}
}
