import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IconAdd } from "../asset/icon";
import { BasicButton, CardText } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT, DEFAULT_TOTAL_RESULT } from "../constant";
import { CardData } from "../model/cardData";
import { TotalDailyResult } from "../model/period";
import { addStreak, rstAddStreak, rstStat } from "../model/stat";
import { rstTraining, rstTrainingIndex, rstTrainingToday } from "../model/training";
import { loadTmpTraining, moveCardBackward, moveCardForward, saveTmpTrainingToday } from "../util/storage";
import { ParamList, Route } from "./Navigator";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
	/* background-color: ${p => p.theme.colors.background}; */
	background-color: 'blue';
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
	const [streak, setStreak] = useRecoilState(rstStat);
	const [index, setIndex] = useRecoilState(rstTrainingIndex);
	const [cards, setCards] = useRecoilState(rstTrainingToday);

	const [result, setResult] = useState<TotalDailyResult>(DEFAULT_TOTAL_RESULT);
	const x = useSharedValue(0);

	const add = () => {
		setStreak(addStreak(streak));
	};

	const current = cards[index];

	const onFinish = () => {
		setCards([]);
		setIndex(0);
		add();
	};

	const next = () => {
		saveTmpTrainingToday({ target: cards, index, result: result });
		if (index === cards.length - 1) {
			onFinish();
			return;
		}
		setIndex(index + 1);

	};

	const success = async (data: CardData) => {
		const tmp = result;
		tmp[data.repeat].push(true);
		setResult(tmp);
		await moveCardForward(data);
		next();
	};

	const fail = async (data: CardData) => {
		const tmp = result;
		tmp[data.repeat].push(false);
		setResult(tmp);
		await moveCardBackward(data);
		next();
	};

	return (
		<Container>
			{!!cards.length && !!current ? (
				<CardHandler
					onSwipeRight={() => success(current)}
					onSwipeLeft={() => fail(current)}
					x={x}
					onPress={() => { }}
				>
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