import React, { useState } from 'react';
import {
	Animated,
	Easing,
	SwitchProps,
	View,
	ViewProps,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useTheme } from 'styled-components';

import { BasicButton } from './Basic';

interface Props extends SwitchProps {
	onValueChange: (isOn: boolean) => void;
	value?: boolean;
	disabled?: boolean;
}

export const Switch = (props: Props) => {
	const { onValueChange, value = false, disabled = false } = props;

	const theme = useTheme();
	const [aniValue] = useState(new Animated.Value(0));

	const moveSwitchToggle = aniValue.interpolate({
		inputRange: [0, 1],
		outputRange: [2, 32],
	});

	Animated.timing(aniValue, {
		toValue: value ? 1 : 0,
		duration: 100,
		easing: Easing.linear,
		useNativeDriver: true,
	}).start();

	const onPress = () => {
		onValueChange(value);
	};

	const WhiteCircle = () => {
		const { colors } = useTheme();
		return (
			<Shadow
				style={{
					shadowColor: colors.black,
					shadowOpacity: 0.3,
					shadowRadius: 5,
				}}
			>
				<Animated.View
					style={{
						height: 24,
						width: 24,
						borderRadius: 12,
						backgroundColor: theme.colors.white,
						transform: [{ translateX: moveSwitchToggle }],
					}}
				/>
			</Shadow>
		);
	};

	const Place = (props: ViewProps) => {
		return (
			<View
				style={{
					height: 30,
					width: 64,
					borderRadius: 15,
					flexDirection: 'row',
					alignItems: 'center',
					alignContent: 'center',
					backgroundColor: value
						? theme.colors.forgetMeNotDark
						: theme.colors.gray,
				}}
			>
				{props.children}
			</View>
		);
	};

	return (
		<BasicButton onPress={onPress} disabled={disabled}>
			<View style={{ flexDirection: 'row' }}>
				<Place>
					<WhiteCircle />
				</Place>
			</View>
		</BasicButton>
	);
};