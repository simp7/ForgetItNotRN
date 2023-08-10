import React, { useRef } from "react";
import { TextInput, TouchableWithoutFeedback, ViewProps } from "react-native";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { trigger } from "react-native-haptic-feedback";
import Animated, {
	DerivedValue,
	Easing,
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	useWorkletCallback,
	withTiming,
} from "react-native-reanimated";
import { Shadow } from 'react-native-shadow-2';
import styled from "styled-components";

import { CARD_HEIGHT, CARD_TILT_ANGLE, CARD_WIDTH } from "../constant";
import { CardData, InputType } from "../model/cardData";
import { CardText, CardTextInput } from "./Basic";

const CardImage = styled(FastImage)`
	width: ${CARD_WIDTH}px;
	height: ${CARD_HEIGHT}px;
	border-radius: 10px;
`;

const CardCover = styled(Animated.View)`
	width: ${CARD_WIDTH}px;
	height: ${CARD_HEIGHT}px;
	border-radius: 10px;
	position: absolute;
`;

export const Remembered = styled(CardCover)`
	background-color: ${p => p.theme.colors.lime};
	opacity: 0;
`;

export const Forgot = styled(CardCover)`
	background-color: ${p => p.theme.colors.grapefruit};
	opacity: 0;
`;

interface CardContainerProps extends ViewProps {
	wrong?: boolean;
	onPress?: () => void;
}

const Container = styled(View) <CardContainerProps>`
  background-color: ${p => p.wrong ? p.theme.colors.wrong : p.theme.colors.card};
	align-items: center;
	justify-content: center;
	width: ${CARD_WIDTH}px;
	height: ${CARD_HEIGHT}px;
	border-radius: 10px;
`;

const CardContainer = (props: CardContainerProps) => {
	const { onPress } = props;
	return (
		<TouchableWithoutFeedback disabled={!onPress} onPress={onPress}>
			<View>
				<Shadow distance={3} style={{ borderRadius: 10 }} offset={[0, 1]}>
					<Container {...props} />
				</Shadow>
			</View>
		</TouchableWithoutFeedback>
	);
};

const QuestionText = styled(CardText)`
	text-align: center;
	font-size: 25px;
`;

interface QuestionCardProps {
	cardData: CardData;
	x?: DerivedValue<number>;
}

export const QuestionCard = (props: QuestionCardProps) => {
	const { cardData: data } = props;
	return (
		<CardContainer>
			{data.question.type === InputType.Text ? <QuestionText>{data.question.data}</QuestionText> : (
				<CardImage source={{ uri: data.question.data }} />
			)}
		</CardContainer>
	);
};

interface CardGradientProps {
	x: SharedValue<number>;
}

const CardGradient = (props: CardGradientProps) => {
	const { x } = props;

	const rememberOpacity = useDerivedValue(() => {
		return interpolate(x.value, [0, 200], [0, 1], Extrapolation.CLAMP);
	}, [x]);

	const forgetOpacity = useDerivedValue(() => {
		return interpolate(x.value, [-200, 0], [1, 0], Extrapolation.CLAMP);
	}, [x]);

	return (
		<>
			<Remembered style={[{ opacity: rememberOpacity }]} />
			<Forgot style={[{ opacity: forgetOpacity }]} />
		</>
	);
};

interface QuestionCardInputProps {
	data: CardData;
	setData: (data: string) => void;
}

export const QuestionInputCard = (props: QuestionCardInputProps) => {
	const { data, setData } = props;
	const ref = useRef<TextInput>(null);

	return (
		<CardContainer onPress={() => ref?.current?.focus()}>
			{data.question.type === InputType.Text ? (
				<CardTextInput
					value={data.question.data}
					ref={ref}
					size={17}
					onChangeText={setData}
					multiline
					textAlign={'center'}
					verticalAlign={'middle'}
					placeholder={'복습용 질문을 입력해주세요.'}
				/>
			) : <QuestionCard cardData={data} />}
		</CardContainer>
	);
};

const CardHandlerContainer = styled(Animated.View)`
	justify-content: center;
`;

interface HandlerProps extends ViewProps {
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	x: SharedValue<number>;
}

export const CardHandler = (props: HandlerProps) => {
	const { onSwipeLeft, onSwipeRight, x, ...viewProps } = props;

	const opacity = useSharedValue(1);

	const cardStyle = useAnimatedStyle(() => {
		const rotate = interpolate(x.value, [-100, 100], [-CARD_TILT_ANGLE, CARD_TILT_ANGLE], {
			extrapolateLeft: Extrapolation.CLAMP,
			extrapolateRight: Extrapolation.CLAMP,
		});

		return {
			transform: [{
				rotateZ: `${rotate}(deg)`,
			}, {
				translateX: x.value,
			}],
			opacity: opacity.value,
		};
	});

	const newCardAnimation = useWorkletCallback(() => {
		x.value = 0;
		opacity.value = 0;
		opacity.value = withTiming(1, {
			duration: 200,
			easing: Easing.cubic,
		});
	});

	const gesture = Gesture.Pan().runOnJS(true).onChange((event) => {
		x.value = event.translationX;
	}).onEnd(() => {

		if (x.value < -200) {
			x.value = withTiming(-1000, {
				duration: 300,
				easing: Easing.cubic,
			}, newCardAnimation);
			trigger('notificationError');
			onSwipeLeft();
			return;
		}
		if (x.value > 200) {
			x.value = withTiming(1000, {
				duration: 300,
				easing: Easing.cubic,
			}, newCardAnimation);
			trigger('notificationSuccess');
			onSwipeRight();
			return;
		}
		x.value = withTiming(0, {
			duration: 200,
			easing: Easing.circle,
		});
	});

	return (
		<GestureDetector gesture={gesture}>
			<>
				<CardHandlerContainer
					{...viewProps}
					style={[
						cardStyle,
					]}
				>
					{props.children}
					<CardGradient x={x} />
				</CardHandlerContainer>
			</>
		</GestureDetector>
	);
};