import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../model/constant";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
`;

export const MainView = () => {
	return (
		<Container>
			<QuestionCard question="ok" />
		</Container>
	);
};