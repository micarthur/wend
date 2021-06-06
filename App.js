import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Splash from "./screens/splash/splash";
import Home from "./screens/home/home";

const instructions = Platform.select({
	ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
	android:
		"Double tap R on your keyboard to reload,\n" +
		"Shake or press menu button for dev menu",
});

const AppNavigator = createStackNavigator(
	{
		Splash: Splash,
		Login: Login,
		Register: Register,
		Home: Home,
	},
	{
		initialRouteName: "Splash",
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}
