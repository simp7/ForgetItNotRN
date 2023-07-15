import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { IconAdd } from "../asset/icon";
import { BasicButton } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { CardData, InputType } from "../model/cardData";
import { rstTrainingIndex, rstTrainingToday } from "../model/training";
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

	const [index, setIndex] = useRecoilState(rstTrainingIndex);
	const [cards, setCards] = useRecoilState(rstTrainingToday);

	const current = cards[index];


	const onFinish = () => {

		// evaluateAllPeriod();
	};

	const next = () => {
		if (index === cards.length - 1) {
			onFinish();
			return;
		}
		setIndex(index + 1);
	};

	const success = (data: CardData) => {
		next();
	};

	const fail = (data: CardData) => {
		next();
	};

	useEffect(() => {
		// TODO: uncomment next line when completing process.
		// loadCardData(now()).then(setCards);
		setCards([{
			question: {
				type: InputType.Text,
				data: "ok",
			},
			repeat: 1,
			lastReviewed: '',
		}]);
	}, []);

	return (
		<Container>
			{!!cards.length && (
				<CardHandler onSwipeRight={() => success(current)} onSwipeLeft={() => fail(current)}>
					<QuestionCard cardData={current} />
				</CardHandler>
			)}
			<AddButtonContainer onPress={() => props.navigation.navigate(Route.Add)}>
				<IconAdd />
			</AddButtonContainer>
		</Container>
	);
};