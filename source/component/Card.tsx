import React, { useRef } from "react";
import { TextInput, TouchableWithoutFeedback, ViewProps } from "react-native";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import Animated from "react-native-reanimated";
import { Shadow } from 'react-native-shadow-2';
import styled from "styled-components";

import { CARD_HEIGHT, CARD_WIDTH } from "../constant";
import { CardData, InputType } from "../model/cardData";
import { CardText, CardTextInput } from "./Basic";

const CardImage = styled(FastImage)`
	width: ${CARD_WIDTH}px;
	height: ${CARD_HEIGHT}px;
	border-radius: 10px;
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
					ref={ref}
					size={17}
					onChangeText={setData}
					multiline
					textAlign={'center'}
					verticalAlign={'middle'}
					placeholder={'텍스트를 입력해주세요.'}
				/>
			) : <QuestionCard cardData={data} />
			}
		</CardContainer>
	);
};