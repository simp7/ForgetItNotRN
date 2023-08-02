import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, { Extrapolation, interpolate, SharedValue, useDerivedValue } from "react-native-reanimated";
import styled, { useTheme } from "styled-components";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant";

const Container = styled(View)`
	position: absolute;
	height: ${SCREEN_HEIGHT}px;
	width: ${SCREEN_WIDTH}px;
	top: 0;
	left: 0;
	right: 0;
	down: 0;
`;

const Base = styled(Animated.View)`
	width: 100%;
	height: 100%;
	background-color: navy;
	position: absolute;
	opacity: 0;
`;

const Gradient = styled(LinearGradient)`
	flex: 1;
	align-self: stretch;
`;

interface GraidentProps {
	opacity: SharedValue<number>;
}

const RememberedGradient = (props: GraidentProps) => {
	const { colors } = useTheme();
	return (
		<Base style={[{ opacity: props.opacity, right: 0 }]}>
			<Gradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={[colors.background, colors.lime]}
			/>
		</Base>
	);
};

const ForgotGradient = (props: GraidentProps) => {
	const { colors } = useTheme();
	return (
		<Base style={[{ opacity: props.opacity, left: 0 }]}>
			<Gradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={[colors.grapefruit, colors.background]}
			/>
		</Base >
	);
};

interface CardGradientProps {
	x: SharedValue<number>;
}

export const CardGradient = (props: CardGradientProps) => {
	const { x } = props;

	const rememberOpacity = useDerivedValue(() => {
		console.log(x.value, interpolate(x.value, [0, 200], [0, 1], Extrapolation.CLAMP));
		return interpolate(x.value, [0, 200], [0, 1], Extrapolation.CLAMP);
	}, [x]);

	const forgetOpacity = useDerivedValue(() => {
		return interpolate(x.value, [-200, 0], [1, 0], Extrapolation.CLAMP) ?? 0;
	}, [x]);

	return (
		<Container pointerEvents={'none'}>
			<RememberedGradient opacity={rememberOpacity} />
			<ForgotGradient opacity={forgetOpacity} />
		</Container>
	);
};