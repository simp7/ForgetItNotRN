import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";

import { IconBack, IconChart, IconCog } from "../asset/icon";
import { BasicButton } from "../component/Basic";
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

export type ParamList = {
	[Route.Main]: undefined;
	[Route.Setting]: undefined;
	[Route.Chart]: undefined;
	[Route.Add]: undefined;
}

const SettingButton = (props: TouchableOpacityProps) => {
	return (
		<BasicButton {...props}>
			<IconCog />
		</BasicButton>
	);
};

const ChartButton = (props: TouchableOpacityProps) => {
	return (
		<BasicButton {...props}>
			<IconChart />
		</BasicButton>
	);
};

type NavProps = StackScreenProps<ParamList, Route.Main>;

export const Navigator = () => {
	const { colors } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName={Route.Main}
			screenOptions={{
				cardStyle: { backgroundColor: colors.background },
				headerStyle: { backgroundColor: colors.background },
				headerLeftContainerStyle: { paddingHorizontal: 30 },
				headerRightContainerStyle: { paddingHorizontal: 30 },
				headerTransparent: true,
				headerShadowVisible: false,
				gestureEnabled: false,
				headerTitle: "",
				headerBackImage: () => <IconBack />,
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen
				name={Route.Main}
				component={MainView}
				options={({ navigation }) => ({
					headerLeft: () => <SettingButton onPress={() => navigation.navigate(Route.Setting)} />,
					headerRight: () => <ChartButton onPress={() => navigation.navigate(Route.Chart)} />,
				})}
			/>
			<Stack.Screen
				name={Route.Setting}
				component={SettingView}
				options={{
					gestureDirection: "horizontal-inverted",
				}}
			/>
			<Stack.Screen name={Route.Chart} component={ChartView} />
			<Stack.Screen name={Route.Add} component={AddView} />
		</Stack.Navigator>
	);
};