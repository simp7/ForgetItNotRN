import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import styled from "styled-components";

import { CameraIcon, GalleryIcon } from "../asset/icon";
import { BasicButton, SpacerHeight } from "../component/Basic";
import { CardHandler, QuestionInputCard } from "../component/Card";
import { CardGradient } from "../component/Gradient";
import { DEFAULT_CARD_DATA } from "../constant";
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

	const initialize = () => {
		setText('');
		setData(DEFAULT_CARD_DATA);
	};

	const save = () => {
		loadCardData(0).then((previous) => saveCardData(0, [...previous, data]));
		initialize();
	};

	const discard = initialize;

	const setImage = (url: string) => {
		setData({
			repeat: 0,
			lastReviewed: formatDate(now()),
			question: {
				type: InputType.Image,
				data: url,
			},
		});
	};

	const setText = (text: string) => {
		setData({
			repeat: 0,
			lastReviewed: formatDate(now()),
			question: {
				type: InputType.Text,
				data: text,
			},
		});
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Container>
				<CardGradient x={x} />
				<CardHandler onSwipeLeft={discard} onSwipeRight={save} x={x}>
					<QuestionInputCard data={data} setData={setText} />
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