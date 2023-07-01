import React, { useState } from "react";
import { Keyboard, TouchableOpacityProps, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";

import { CameraIcon, GalleryIcon } from "../asset/icon";
import { BasicButton, SpacerHeight } from "../component/Basic";
import { QuestionInputCard } from "../component/Card";
import { CardData, InputType } from "../model/cardData";
import { formatDate, now } from "../util/date";
import { pictureFromCamera, pictureFromGallery } from "../util/image";

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

const CameraButton = (props: TouchableOpacityProps) => {
	return (
		<Button {...props}>
			<CameraIcon />
		</Button>
	);
};

const GalleryButton = (props: TouchableOpacityProps) => {
	return (
		<Button {...props}>
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
	const [data, setData] = useState<CardData>();
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
				<SpacerHeight size={40} />
				<ButtonRow>
					<CameraButton onPress={pictureFromCamera} />
					<GalleryButton onPress={pictureFromGallery} />
				</ButtonRow>
			</Container>
		</TouchableWithoutFeedback>
	);
};