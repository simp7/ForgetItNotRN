import React from "react";
import { View } from "react-native";
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
	font-size: 17px;
`;

interface QuestionCardProps {
	question: string;
}
export const QuestionCard = (props: QuestionCardProps) => {
	const { question } = props;
	return (
		<CardContainer>
			<QuestionText>{question}</QuestionText>
		</CardContainer>
	);
};