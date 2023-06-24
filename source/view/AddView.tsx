import React, { useState } from "react";
import { Keyboard, TouchableOpacityProps, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";

import { BasicButton, SpacerHeight } from "../component/Basic";
import { QuestionInputCard } from "../component/Card";
import { CardData, InputType } from "../model/cardData";
import { formatDate, now } from "../util/date";

const Container = styled(View)`
	flex: 1;
	align-self: stretch;
	justify-content: center;
	align-items: center;
`;

const Button = styled(BasicButton) <{ height?: number }>`
	background-color: ${p => p.theme.colors.tint};
	height: 80px;
	width: 140px;
	border-radius: 10px;
`;

const CameraButton = (props: TouchableOpacityProps) => {
	return (
		<Button {...props}>
		</Button>
	);
};

const GalleryButton = (props: TouchableOpacityProps) => {
	return (
		<Button {...props}>
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
					<CameraButton />
					<GalleryButton />
				</ButtonRow>
			</Container>
		</TouchableWithoutFeedback>
	);
};