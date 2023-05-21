import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "styled-components";

import { MainView } from "./MainView";

const Stack = createStackNavigator();

export enum Route {
	Main = 'Main'
}

export const Navigator = () => {

	const { colors } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName={Route.Main}
			screenOptions={{
				cardStyle: { backgroundColor: colors.background },
			}}
		>
			<Stack.Screen name={Route.Main} component={MainView} />
		</Stack.Navigator>
	);
};