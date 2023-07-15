import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IconAdd } from "../asset/icon";
import { BasicButton } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { CardData, InputType, rstPeriod } from "../model/cardData";
import { evaluateAllPeriod } from "../model/period";
import { now } from "../util/date";
import { loadCardData } from "../util/storage";
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
	const [cards, setCards] = useState<CardData[]>([]);
	const [index, setIndex] = useState(0);
	const period = useSetRecoilState(rstPeriod);

	const afterOne = () => {
		if (index === cards.length - 1) {
			return;
		}
		setIndex(index + 1);
	};

	const success = () => {
		afterOne();
	};

	const fail = () => {
		afterOne();
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

	const onFinish = () => {

		// evaluateAllPeriod();
	};

	return (
		<Container>
			{!!cards.length && (
				<CardHandler onSwipeRight={success} onSwipeLeft={fail}>
					<QuestionCard cardData={cards[index]} />
				</CardHandler>
			)}
			<AddButtonContainer onPress={() => props.navigation.navigate(Route.Add)}>
				<IconAdd />
			</AddButtonContainer>
		</Container>
	);
};