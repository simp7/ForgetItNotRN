import React, { useState } from 'react';
import { Animated, Easing, SwitchProps, View } from 'react-native';
import styled from 'styled-components';

import { BasicButton } from './Basic';

interface Props extends SwitchProps {
	onValueChange: (isOn: boolean) => void;
	value?: boolean;
	disabled?: boolean;
}
const ThumbBase = styled(Animated.View)`
	height: 30px;
	width: 30px;
	border-radius: 15px;
	background-color: ${p => p.theme.colors.white};
`;

const Place = styled(View) <{ isOn?: boolean }>`
	height: 32px;
	width: 64px;
	border-radius: 16px;
	flex-direction: row;
	align-items: center;
	align-content: center;
	background-color: ${p => p.isOn ? p.theme.colors.subTint : p.theme.colors.gray};
`;

export const Switch = (props: Props) => {
	const { onValueChange, value = false, disabled = false } = props;

	const [aniValue] = useState(new Animated.Value(0));

	const moveSwitchToggle = aniValue.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 33],
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

	return (
		<BasicButton onPress={onPress} disabled={disabled}>
			<Place isOn={value}>
				<ThumbBase style={{ transform: [{ translateX: moveSwitchToggle }] }} />
			</Place>
		</BasicButton>
	);
};