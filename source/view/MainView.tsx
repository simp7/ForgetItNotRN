import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { IconAdd } from "../asset/icon";
import { BasicButton } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { CardData, InputType } from "../model/cardData";
import { ParamList, Route } from "./Navigator";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
`;

const AddButtonContainer = styled(BasicButton)`
	position: absolute;
	right: 40px;
	bottom: ${40 + BOTTOM_SAFE_HEIGHT}px;
`;

type NavProps = StackScreenProps<ParamList, Route.Main>;

export const MainView = (props: NavProps) => {
	const data: CardData = {
		question: {
			type: InputType.Text,
			data: "ok",
		},
		repeat: 1,
		lastReviewed: '',
	};
	return (
		<Container>
			<CardHandler onSwipeRight={() => { }} onSwipeLeft={() => { }}>
				<QuestionCard cardData={data} />
			</CardHandler>
			<AddButtonContainer onPress={() => props.navigation.navigate(Route.Add)}>
				<IconAdd />
			</AddButtonContainer>
		</Container>
	);
};