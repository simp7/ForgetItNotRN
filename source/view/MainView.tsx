import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { IconAdd } from "../asset/icon";
import { BasicButton, CardText } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { CardData } from "../model/cardData";
import { loadTrainingToday, saveTmpTrainingToday } from "../util/storage";
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


const EmptyContainer = styled(View)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	align-items: center;
	justify-content: center;
`;

type NavProps = StackScreenProps<ParamList, Route.Main>;

export const MainView = (props: NavProps) => {

	const [index, setIndex] = useState(0);
	const [cards, setCards] = useState<CardData[]>([]);

	useEffect(() => {
		loadTrainingToday().then(data => {
			setIndex(data.index);
			setCards(data.target);
		});
	}, []);
	// const [index, setIndex] = useRecoilState(rstTrainingIndex);
	// const [cards, setCards] = useRecoilState(rstTrainingToday);

	useEffect(() => {
		saveTmpTrainingToday({ target: cards, index });
	}, [cards, index]);

	const current = cards[index];


	const onFinish = () => {
		setCards([]);
		setIndex(0);
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

	return (
		<Container>
			{!!cards.length ? (
				<CardHandler onSwipeRight={() => success(current)} onSwipeLeft={() => fail(current)}>
					<QuestionCard cardData={current} />
				</CardHandler>
			) : (
				<EmptyContainer>
					<CardText size={22} bold>{'오늘 리뷰할 내용이 없습니다.'}</CardText>
				</EmptyContainer>
			)}
			<AddButtonContainer onPress={() => props.navigation.navigate(Route.Add)}>
				<IconAdd />
			</AddButtonContainer>
		</Container>
	);
};