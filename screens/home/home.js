import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
// import { Overlay } from "react-native-elements";
import styles from "./styles";

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
		const name = this.props.navigation.state.params.name;
		// console.log(this.props.navigation.state.params.name);
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.containerMain}>
					<Text>Welcome {name}</Text>
					<Button
						mode="contained"
						style={styles.button}
						onPress={() => this.props.navigation.goBack()}
					>
						<Text style={styles.textStyle}>Go Back</Text>
					</Button>
				</View>
			</SafeAreaView>
		);
	}
}
