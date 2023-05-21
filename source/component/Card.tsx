import React from "react";
import { View } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import styled from "styled-components";

import { SCREEN_WIDTH } from "../model/constant";
import { PlainText } from "./Basic";

const CardContainer = styled(View) <{ wrong?: boolean }>`
  background-color: ${p => p.wrong ? p.theme.colors.wrong : p.theme.colors.card};
	align-items: center;
	justify-content: center;
	width: ${SCREEN_WIDTH - 2 * 30}px;
	height: 500px;
	border-radius: 10px;
`;

const QuestionText = styled(PlainText)`
	text-align: center;
`;

interface QuestionCardProps {
	question: string;
}

export const QuestionCard = (props: QuestionCardProps) => {
	const { question } = props;
	return (
		<Shadow distance={3} style={{ borderRadius: 10 }} offset={[0, 1]}>
			<CardContainer>
				<QuestionText>{question}</QuestionText>
			</CardContainer>
		</Shadow>
	);
};