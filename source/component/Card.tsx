import React from "react";
import { ViewProps } from "react-native";
import { View } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import styled from "styled-components";

import { SCREEN_WIDTH } from "../constant";
import { CardData } from "../model/cardData";
import { CardText, CardTextInput } from "./Basic";

interface CardContainerProps extends ViewProps {
	wrong?: boolean;
}

const Container = styled(View) <CardContainerProps>`
  background-color: ${p => p.wrong ? p.theme.colors.wrong : p.theme.colors.card};
	align-items: center;
	justify-content: center;
	width: ${SCREEN_WIDTH - 2 * 30}px;
	height: 500px;
	border-radius: 10px;
`;

const CardContainer = (props: CardContainerProps) => {
	return (
		<Shadow distance={3} style={{ borderRadius: 10 }} offset={[0, 1]}>
			<Container {...props} />
		</Shadow>
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
			<QuestionText>{data.question.data}</QuestionText>
		</CardContainer>
	);
};

interface QuestionCardInputProps {
	setData: (data: string) => void;
}

export const QuestionInputCard = (props: QuestionCardInputProps) => {
	const { setData } = props;
	return (
		<CardContainer>
			<CardTextInput
				size={17}
				onChangeText={setData}
				multiline
				textAlign={'center'}
				verticalAlign={'middle'}
			/>
		</CardContainer>
	);
};