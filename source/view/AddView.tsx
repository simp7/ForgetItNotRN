import React, { useRef, useState } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { CameraIcon, GalleryIcon } from "../asset/icon";
import { BasicButton, SpacerHeight } from "../component/Basic";
import { CardHandler, QuestionInputCard } from "../component/Card";
import { DEFAULT_CARD_DATA } from "../constant";
import { rstAddMode } from "../model/addMode";
import { CardData, InputType } from "../model/cardData";
import { formatDate, now } from "../util/date";
import { pictureFromCamera, pictureFromGallery } from "../util/image";
import { loadCardData, saveCardData } from "../util/storage";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
`;

const Button = styled(BasicButton) <{ height?: number }>`
	background-color: ${p => p.theme.colors.tint};
	justify-content: center;
	align-items: center;
	height: 80px;
	width: 140px;
	border-radius: 10px;
`;

interface ImageSetterProps {
	setImage: (url: string) => void;
}

const CameraButton = (props: ImageSetterProps) => {
	const { setImage } = props;
	const onPress = async () => {
		const url = await pictureFromCamera();
		if (!!url) {
			setImage(url);
		}
	};
	return (
		<Button onPress={onPress}>
			<CameraIcon />
		</Button>
	);
};

const GalleryButton = (props: ImageSetterProps) => {
	const { setImage } = props;
	const onPress = async () => {
		const url = await pictureFromGallery();
		if (!!url) {
			setImage(url);
		}
	};
	return (
		<Button onPress={onPress}>
			<GalleryIcon />
		</Button>
	);
};

const ButtonRow = styled(View)`
	flex-direction: row;
	justify-content: space-evenly;
	align-self: stretch;
`;

export const AddView = () => {
	const [data, setData] = useState<CardData>(DEFAULT_CARD_DATA);
	const x = useSharedValue(0);
	const ref = useRef<TextInput>(null);
	const [mode, setMode] = useRecoilState(rstAddMode);

	const initialize = () => {
		setMode('QUESTION');
		setData(DEFAULT_CARD_DATA);
	};

	const save = () => {
		loadCardData(0).then((previous) => saveCardData(0, [...previous, data]));
		initialize();
	};

	const discard = initialize;

	const setImage = (url: string) => {
		if (mode === 'QUESTION') {
			setQuestionImage(url);
			return;
		}
		setAnswerImage(url);
	};

	const setQuestionImage = (url: string) => {
		setData(prev => ({
			...prev,
			lastReviewed: formatDate(now()),
			question: {
				type: InputType.Image,
				data: url,
			},
		}));
	};

	const setAnswerImage = (url: string) => {
		setData(prev => ({
			...prev,
			lastReviewed: formatDate(now()),
			answer: {
				type: InputType.Image,
				data: url,
			},
		}));
	};

	const setText = (text: string) => {
		if (mode === 'QUESTION') {
			setQuestionText(text);
			return;
		}
		setAnswerText(text);
	};

	const setQuestionText = (text: string) => {
		setData(prev => ({
			...prev,
			lastReviewed: formatDate(now()),
			question: {
				type: InputType.Text,
				data: text,
			},
		}));
	};

	const setAnswerText = (text: string) => {
		setData(prev => ({
			...prev,
			lastReviewed: formatDate(now()),
			answer: {
				type: InputType.Text,
				data: text,
			},
		}));
	};

	const handlerPressed = () => {
		if (mode === 'ANSWER' && data.answer?.type === InputType.Image) {
			setAnswerText('');
		}
		if (mode === 'QUESTION' && data.question.type === InputType.Image) {
			setQuestionText('');
		}
		ref.current?.focus();
	};

	const setInput = (text: string) => {
		if (mode === 'ANSWER' && data.answer?.type === InputType.Image
			|| mode === 'QUESTION' && data.question.type === InputType.Image) {
			return;
		}
		setText(text);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Container>
				<CardHandler
					onSwipeLeft={discard}
					onSwipeRight={save}
					onPress={() => handlerPressed()}
					x={x}
					addMode
				>
					<QuestionInputCard
						mode={mode}
						cardData={data}
						setData={setInput}
						ref={ref}
					/>
				</CardHandler>
				<SpacerHeight size={40} />
				<ButtonRow>
					<CameraButton setImage={setImage} />
					<GalleryButton setImage={setImage} />
				</ButtonRow>
			</Container>
		</TouchableWithoutFeedback>
	);
};