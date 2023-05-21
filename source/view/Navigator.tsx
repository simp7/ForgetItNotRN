import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "styled-components";

import { AddView } from "./AddView";
import { ChartView } from "./ChartView";
import { MainView } from "./MainView";
import { SettingView } from "./SettingView";

const Stack = createStackNavigator();

export enum Route {
	Main = 'Main',
	Setting = 'Setting',
	Chart = 'Chart',
	Add = 'Add',
}

export const Navigator = () => {

	const { colors } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName={Route.Main}
			screenOptions={{
				cardStyle: { backgroundColor: colors.background },
				headerStyle: { backgroundColor: colors.background },
				headerTransparent: true,
				headerShadowVisible: false,
				headerTitle: "",
			}}
		>
			<Stack.Screen name={Route.Main} component={MainView} />
			<Stack.Screen name={Route.Setting} component={SettingView} />
			<Stack.Screen name={Route.Chart} component={ChartView} />
			<Stack.Screen name={Route.Add} component={AddView} />
		</Stack.Navigator>
	);
};