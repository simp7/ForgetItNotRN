import { CardStyleInterpolators, createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useRecoilState } from "recoil";
import { useTheme } from "styled-components";

import { IconBack, IconChart, IconCog, IconSwap } from "../asset/icon";
import { BasicButton } from "../component/Basic";
import { STATUSBAR_HEIGHT } from "../constant";
import { rstAddMode, swapAddMode } from "../model/addMode";
import { AddView } from "./AddView";
import { ChartView } from "./ChartView";
import { MainView } from "./MainView";
import { SettingView } from "./SettingView";

export enum Route {
	Main = 'Main',
	Setting = 'Setting',
	Chart = 'Chart',
	Add = 'Add',
	Tag = 'Tag',
}

export type ParamList = {
	[Route.Main]: undefined;
	[Route.Setting]: undefined;
	[Route.Chart]: undefined;
	[Route.Add]: undefined;
	[Route.Tag]: undefined;
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

const BackButton = (props: TouchableOpacityProps) => {
	return (
		<BasicButton {...props}>
			<IconBack />
		</BasicButton>
	);
};

const SwapButton = (props: TouchableOpacityProps) => {
	return (
		<BasicButton {...props}>
			<IconSwap />
		</BasicButton>
	);
};

const Stack = createStackNavigator<ParamList>();

export const Navigator = () => {
	const { colors } = useTheme();
	const [addMode, setAddMode] = useRecoilState(rstAddMode);

	return (
		<Stack.Navigator
			initialRouteName={Route.Main}
			screenOptions={{
				cardStyle: { backgroundColor: colors.background },
				headerStatusBarHeight: STATUSBAR_HEIGHT,
				headerLeftContainerStyle: { paddingHorizontal: 35 },
				headerRightContainerStyle: { paddingHorizontal: 35 },
				headerTransparent: true,
				headerShadowVisible: false,
				gestureEnabled: false,
				headerTitle: "",
				headerBackTitleVisible: false,
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: 'bold',
					textAlign: 'center',
				},
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen
				name={Route.Main}
				component={MainView}
				options={({ navigation }: StackScreenProps<ParamList, Route.Main>) => ({
					headerLeft: () => <SettingButton onPress={() => navigation.navigate(Route.Setting)} />,
					headerRight: () => <ChartButton onPress={() => navigation.navigate(Route.Chart)} />,
				})}
			/>
			<Stack.Screen
				name={Route.Setting}
				component={SettingView}
				options={({ navigation }: StackScreenProps<ParamList, Route.Setting>) => ({
					gestureDirection: 'horizontal-inverted',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
				})}
			/>
			<Stack.Screen
				name={Route.Chart}
				component={ChartView}
				options={({ navigation }: StackScreenProps<ParamList, Route.Chart>) => ({
					headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			<Stack.Screen
				name={Route.Add}
				component={AddView}
				options={({ navigation }: StackScreenProps<ParamList, Route.Add>) => ({
					gestureDirection: 'vertical',
					cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					headerTitle: addMode === 'QUESTION' ? 'Question' : 'Answer',
					headerRight: () => <SwapButton onPress={() => setAddMode(swapAddMode)} />,
					headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
				})}
			/>
			<Stack.Screen
				name={Route.Tag}
				component={AddView}
				options={({ navigation }: StackScreenProps<ParamList, Route.Tag>) => ({
					headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
				})}
			/>
		</Stack.Navigator>
	);
};