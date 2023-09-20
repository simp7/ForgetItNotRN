import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { useTheme } from "styled-components";

import { IconAdd, IconTrash } from "../asset/icon";
import { BasicButton, CardText } from "../component/Basic";
import { CardHandler, QuestionCard } from "../component/Card";
import { BOTTOM_SAFE_HEIGHT } from "../constant";
import { dataType } from "../model/addMode";
import { CardData } from "../model/cardData";
import { rstResultByIndex } from "../model/period";
import { addStreak, rstStreaks } from "../model/streaks";
import { rstResetTraining, rstTrainingIndex, rstTrainingToday } from "../model/training";
import { moveCardBackward, moveCardForward, removeCardFromStorage } from "../util/storage";
import { ParamList, Route } from "./Navigator";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
	padding-bottom: ${BOTTOM_SAFE_HEIGHT}px;
	background-color: 'blue';
`;

const DeleteButtonContainer = styled(BasicButton)`
	align-items: center;
	position: absolute;
	left: 40px;
	bottom: ${40 + BOTTOM_SAFE_HEIGHT}px;
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

const ConfirmDeleteContainer = styled(View)`
	position: absolute;
	bottom: ${BOTTOM_SAFE_HEIGHT + 120}px;
	align-self: center;
`;

type NavProps = StackScreenProps<ParamList, Route.Main>;

export const MainView = (props: NavProps) => {
	const [streak, setStreak] = useRecoilState(rstStreaks);
	const [index, setIndex] = useRecoilState(rstTrainingIndex);
	const cards = useRecoilValue(rstTrainingToday);
	const reset = useSetRecoilState(rstResetTraining);
	const setResult = useSetRecoilState(rstResultByIndex(cards[index]?.repeat ?? 0));

	const [mode, setMode] = useState<dataType>('QUESTION');
	const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

	const { colors } = useTheme();

	const x = useSharedValue(0);

	const increaseStreak = () => {
		setStreak(addStreak(streak));
	};

	const current = cards[index];

	const onFinish = () => {
		reset();
		increaseStreak();
	};

	const next = () => {
		if (index === cards.length - 1) {
			onFinish();
			return;
		}

		setIndex(index + 1);
		setConfirmDelete(false);
	};

	const success = async (data: CardData) => {
		setResult(prev => prev.concat(true));
		await moveCardForward(data);
		next();
	};

	const fail = async (data: CardData) => {
		setResult(prev => prev.concat(false));
		await moveCardBackward(data);
		next();
	};

	const swapMode = () => {
		if (!current.answer) {
			return;
		}
		setMode(mode => mode === 'QUESTION' ? 'ANSWER' : 'QUESTION');
	};

	const onDeleteButtonPressed = async () => {
		if (!confirmDelete) {
			setConfirmDelete(true);
			return;
		}

		await removeCardFromStorage(current);
		setConfirmDelete(false);
		next();
	};

	return (
		<Container>
			{!!cards.length && !!current ? (
				<CardHandler
					onSwipeRight={() => success(current)}
					onSwipeLeft={() => fail(current)}
					x={x}
					addMode={false}
					onPress={() => swapMode()}
				>
					<QuestionCard cardData={current} mode={mode} />
				</CardHandler>
			) : (
				<EmptyContainer>
					<CardText size={22} bold>{'오늘 복습할 내용이 없습니다.'}</CardText>
				</EmptyContainer>
			)}
			{confirmDelete && (
				<ConfirmDeleteContainer>
					<CardText>{'삭제하려면 한번 더 터치하세요'}</CardText>
				</ConfirmDeleteContainer>
			)}
			{!!current && (
				<DeleteButtonContainer onPress={onDeleteButtonPressed}>
					<IconTrash size={60} tint={confirmDelete ? colors.grapefruit : colors.tint} />
				</DeleteButtonContainer>
			)}
			<AddButtonContainer onPress={() => props.navigation.navigate(Route.Add)}>
				<IconAdd />
			</AddButtonContainer>
		</Container>
	);
};