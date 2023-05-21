import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "styled-components";

const Stack = createStackNavigator();

export enum Route {
  Main = 'Main'
}

const Navigator = () => {

	const { colors } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName={Route.Main}
			screenOptions={{
				cardStyle: { backgroundColor: colors.background },
			}}
		>
			<Stack.Screen name={Route.Main} />
		</Stack.Navigator>
	);
};