import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { Spacer } from "../component/Basic";
import { QuestionInputCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { CardData, InputType } from "../model/cardData";
import { formatDate, now } from "../util/date";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT + 30}px;
`;

export const AddView = () => {
	const [data, setData] = useState<CardData>();
	return (
		<Container>
			<QuestionInputCard
				setData={(text: string) => {
					setData({
						repeat: 0,
						lastReviewed: formatDate(now()),
						question: {
							type: InputType.Image,
							data: text,
						},
					});
				}}
			/>
			<Spacer />
		</Container>
	);
};